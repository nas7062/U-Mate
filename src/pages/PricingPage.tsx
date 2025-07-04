import React, { useCallback, useEffect, useState } from 'react';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { useDebounce } from '../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { closeModal, openModal } from '../store/modalSlice';
import { useToast } from '../hooks/useToast';
import { calculateDiscountedPrice } from '../utils/getDiscountFee';
import { sortPlans } from '../utils/sortPlans';

import { HeaderProps } from '../components/Header';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import SortList from '../components/BottomSheet/SortList';
import PlanCard from '../components/PlanCard';
import FilterButton from '../components/FilterButton';
import FilterModal from '../components/Modal/FilterModal';
import ConfirmModal from '../components/Modal/ConfirmModal';
import LoginBanner from '../components/LoginBanner';
import Button from '../components/Button';

// 요금제 리스트 불러오기
import { getFilteredPlans, getPlanList, updatePlan } from '../apis/planApi';
import { FilteredPlanPayload, Plan, PlanFilterRequest } from '../types/plan';
import { setUser } from '../store/userSlice';

const PricingPage = () => {
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();
  const [sortOpen, setSortOpen] = useState(false); // 정렬 시트 토글
  const [isSorted, setIsSorted] = useState('인기순'); // 선택된 정렬 기준
  const [filteredCount, setFilteredCount] = useState(0); // 사용자 맞춤 필터링된 요금제 개수
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null); // 선택된 요금제 (비교 또는 변경)
  const [visibleCount, setVisibleCount] = useState(6); // 초반에 요금제 6개만 보여주기
  const [planList, setPlanList] = useState<Plan[]>([]);
  const [filters, setFilters] = useState<PlanFilterRequest>({
    ageGroup: '',
    minFee: undefined,
    maxFee: undefined,
    dataType: '상관없어요',
    benefitIds: [],
  });
  const [loading, setLoading] = useState(true);

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const user = useAppSelector((state) => state.user);

  // 모달 타입 정의
  const [modalType, setModalType] = useState<'compare' | 'filter' | 'change' | null>(null);

  const [firstPlan, setFirstPlan] = useState<boolean>(false);

  // 초기 로드 시 필터링 함수 호출 방지하는 함수
  const shouldFetchData = (filters: PlanFilterRequest) => {
    if (!firstPlan) setFirstPlan(true);
    else if (
      !(
        filters.ageGroup !== '' ||
        filters.minFee !== undefined ||
        filters.maxFee !== undefined ||
        filters.dataType !== '상관없어요' ||
        (filters.benefitIds && filters.benefitIds.length > 0)
      )
    ) {
      return true;
    }

    return (
      filters.ageGroup !== '' ||
      filters.minFee !== undefined ||
      filters.maxFee !== undefined ||
      filters.dataType !== '상관없어요' ||
      (filters.benefitIds && filters.benefitIds.length > 0)
    );
  };

  useEffect(() => {
    setHeaderConfig({
      title: '요금제',
      showBackButton: true,
      showSearch: false,
    });
  }, []);

  // 요금제 리스트 불러오기
  useEffect(() => {
    const fetchPlanList = async () => {
      try {
        setLoading(true);
        const { data } = await getPlanList();
        setPlanList(data);
        setFilteredCount(data.length);
      } catch (error) {
        // Error handled silently
      } finally {
        setLoading(false);
      }
    };
    fetchPlanList();
  }, []);

  // 필터링된 요금제 리스트 불러오기
  const handleSelect = useCallback(async () => {
    if (!shouldFetchData(filters)) return;

    const payload = {
      ...filters,
      benefitIds: filters.benefitIds?.length ? filters.benefitIds.join(',') : '',
    };

    try {
      setLoading(true);
      const { data, count } = await getFilteredPlans(payload);

      setPlanList(data);
      setFilteredCount(count); // 필터링된 개수 설정
      setVisibleCount((prev) => (prev > count ? count : prev)); // visibleCount 업데이트
      dispatch(closeModal());
    } catch (error) {
      toast?.showToast('요금제 불러오기 실패', 'error');
    } finally {
      setLoading(false);
    }
  }, [filters, dispatch, toast]);

  // 필터링된 요금제 개수 불러오기 (버튼 실시간 반영)
  const debouncedFilters = useDebounce(filters, 300);

  useEffect(() => {
    const fetchCount = async () => {
      // 초기 로드 시 요청 방지
      if (!shouldFetchData(filters)) return;

      const payload: FilteredPlanPayload = {
        ageGroup: debouncedFilters.ageGroup,
        minFee: debouncedFilters.minFee,
        maxFee: debouncedFilters.maxFee,
        dataType: debouncedFilters.dataType,
        benefitIds:
          debouncedFilters.benefitIds && debouncedFilters.benefitIds.length > 0
            ? debouncedFilters.benefitIds.join(',')
            : undefined,
      };
      try {
        setLoading(true);
        const { data } = await getFilteredPlans(payload);
        setFilteredCount(data.length); // 필터링된 개수만 업데이트
      } catch (error) {
        // Error handled silently
      } finally {
        setLoading(false);
      }
    };
    fetchCount();
  }, [debouncedFilters]);

  // 모달 닫을 때 필터링된 개수 업데이트
  useEffect(() => {
    // 모달이 닫혔을 때 filteredCount를 업데이트하여 초기화 방지
    setFilteredCount(planList.length);
  }, [planList]);

  // 필터 선택 모달 열기
  const openFilterModal = () => {
    setModalType('filter');
    dispatch(openModal());
  };

  // 필터 선택 모달 닫기
  const closeFilterModal = () => {
    dispatch(closeModal());
    setFilteredCount(planList.length);
  };

  // 필터 초기화하기
  const handleResetFilter = () => {
    setFilters({
      ageGroup: '',
      minFee: undefined,
      maxFee: undefined,
      dataType: '',
      benefitIds: [],
    });
  };

  // 비교하기 모달 열기
  const openCompareModal = (e: React.MouseEvent, plan: Plan) => {
    e.stopPropagation();
    setSelectedPlan(plan);

    setModalType('compare');
    dispatch(openModal());
  };

  // 비교하기 버튼 (비교함으로 이동) 로직
  const handleComparePlans = () => {
    setModalType('compare');
    dispatch(closeModal());
    navigate(`/compare?plan1=${user?.plan}&plan2=${selectedPlan?.PLAN_ID}`);
  };

  // 신청하기 모달 열기
  const openChangeModal = (e: React.MouseEvent, plan: Plan) => {
    e.stopPropagation();
    setModalType('change');

    setSelectedPlan(plan);
    dispatch(openModal());
  };

  // 신청하기 확인 버튼 로직 (사용자 요금제 변경 필요)
  const handleChangePlans = async () => {
    if (!user || user?.id === 0 || user?.id === null) {
      toast?.showToast('로그인 후 이용해 주세요', 'black');
      // 로그인이 아닐 경우 로그인 페이지로 이동
      dispatch(closeModal());
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    if (!selectedPlan) return;

    if (selectedPlan.PLAN_ID === user.plan) {
      toast?.showToast('현재 사용하시는 요금제입니다', 'error');
      dispatch(closeModal());
      return;
    }

    try {
      await updatePlan({
        userId: user?.id,
        newPlanId: selectedPlan?.PLAN_ID,
      });
      setModalType('change');
      // 변경된 요금제 업데이트
      dispatch(
        setUser({
          ...user,
          plan: selectedPlan?.PLAN_ID,
        })
      );
      toast?.showToast('해당 요금제로 신청되었습니다', 'black');
    } catch (error) {
      toast?.showToast('요금제 신청에 실패하였습니다', 'error');
    } finally {
      dispatch(closeModal());
    }
  };

  // 정렬 기준 선택 시
  const handleSortSelect = (value: string) => {
    setIsSorted(value);
    setSortOpen(false);
  };

  // 정렬 로직
  const sortedPlans = sortPlans(planList, isSorted);

  // 페이지네이션 로직
  const handleLoadMore = () => {
    if (visibleCount >= planList.length) {
      toast?.showToast(`더 이상 요금제가 없어요`, 'black'); // 불러올 요금제가 없을 경우 토스트 알림
      return;
    }

    setVisibleCount((prev) => Math.min(prev + 6, planList.length));
  };

  // 요금제명 클릭 시 상세 페이지로 이동
  const goToDetailPage = (planId: number) => {
    navigate(`/plans/${planId}`);
  };

  const PlanCardMemo = React.memo(PlanCard);

  return (
    <div className={`h-full ${loading ? 'min-h-screen' : ''} bg-background`}>
      {/* 만약 사용자가 로그인 상태가 아니라면 배너 띄우기 */}
      {(!user?.id || user?.id === null || user?.id === undefined) && <LoginBanner type="default" />}
      <div className="h-full px-4 lg:px-20">
        {/* 필터 영역 */}
        <div className="flex items-center gap-4 py-4">
          <div className="flex gap-6 text-m">
            <button onClick={() => setSortOpen(true)} className="flex items-center gap-2">
              {isSorted || '인기순'} {sortOpen ? <SlArrowUp /> : <SlArrowDown />}
            </button>
          </div>

          <div className="ml-auto">
            <FilterButton onClick={openFilterModal} />
          </div>
        </div>
        {/* 요금제 카드 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 min-[1200px]:grid-cols-3 gap-4">
          {sortedPlans.slice(0, visibleCount).map((plan) => (
            <PlanCardMemo
              key={plan.PLAN_ID}
              name={plan.PLAN_NAME}
              dataInfo={plan.DATA_INFO}
              shareInfo={plan.SHARE_DATA}
              price={`${plan.MONTHLY_FEE.toLocaleString()}`}
              discountedPrice={`${calculateDiscountedPrice(plan.MONTHLY_FEE, plan.PLAN_NAME)}`}
              rating={{
                score:
                  plan.REVIEW_USER_COUNT === 0
                    ? 0
                    : plan.RECEIVED_STAR_COUNT / plan.REVIEW_USER_COUNT,
                count: plan.REVIEW_USER_COUNT,
              }}
              size="large"
              onCompareClick={(e) => openCompareModal(e, plan)}
              onChangeClick={(e) => openChangeModal(e, plan)}
              onClick={() => goToDetailPage(plan.PLAN_ID)}
            />
          ))}
        </div>
        {!isOpen && (
          <div className="flex justify-center mt-16 pb-44">
            <Button
              variant="outline"
              color="gray"
              size="xl"
              rounded="full"
              onClick={handleLoadMore}
              className="md:w-96"
            >
              요금제 더보기 ({visibleCount > filteredCount ? filteredCount : visibleCount}/
              {filteredCount})
            </Button>
          </div>
        )}

        {/* 정렬 필터 바텀시트 */}
        <BottomSheet isOpen={sortOpen} onClose={() => setSortOpen(false)}>
          <SortList onSelect={handleSortSelect} selected={isSorted} />
        </BottomSheet>

        {/* 변경하기 모달 (만약 현재 사용하고 있는 요금제가 없다면 신청하기로 띄우기?) */}
        {modalType === 'change' && isOpen && (
          <ConfirmModal
            title="해당 요금제로 신청하시겠습니까?"
            confirmText="신청"
            onConfirm={handleChangePlans}
            onClose={() => dispatch(closeModal())}
          />
        )}
        {/* 비교하기 모달 */}
        {modalType === 'compare' && isOpen && (
          <ConfirmModal
            title="비교할 요금제가 선택되었습니다"
            subtitle="지금 비교하러 가보시겠어요?"
            confirmText="이동"
            onConfirm={handleComparePlans}
            onClose={() => dispatch(closeModal())}
          />
        )}
        {modalType === 'filter' && isOpen && (
          <FilterModal
            filters={filters} // 필터된 상태 관리
            onChange={setFilters} // 변경 핸들러
            onReset={handleResetFilter} // 초기화
            onClose={closeFilterModal}
            onApply={handleSelect}
            planCount={filteredCount}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default PricingPage;
