import { HeaderProps } from '../components/Header';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { calculateDiscountedPrice } from '../utils/getDiscountFree';
import { FiChevronRight } from 'react-icons/fi';
import LoginBanner from '../components/LoginBanner';
import EventBannerCarousel from '../components/EventBanner/EventBannerCarousel';
import Button from '../components/Button';
import PlanCardSmall from '../components/PlanCardSmall';
import PlanInfoBanner from '../components/MainPage/PlanInfoBanner';
import HeroSection from '../components/MainPage/HeroSection';
import '../index.css';
import { useAppSelector } from '../hooks/reduxHooks';
import { getPlanList, getRecommendedPlans } from '../apis/planApi';

const CATEGORIES = ['청년', '청소년', '시니어', '일반'] as const;
type Category = (typeof CATEGORIES)[number];

// 전체 요금제 리스트 타입
type PlanListItem = {
  PLAN_ID: number;
  PLAN_NAME: string;
  MONTHLY_FEE: number;
  DATA_INFO: string;
  DATA_INFO_DETAIL: string;
  RECEIVED_STAR_COUNT: number;
  REVIEW_USER_COUNT: number;
};

// 연령대별 추천 요금제 타입
type RecommendedPlan = {
  planId: number;
  name: string;
  monthlyFee: number;
  dataInfo: string;
  shareData: string;
  avgRating: number;
  reviewCount: number;
};

const MainPage = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  const scrollRef = useHorizontalScroll();
  const setHeaderConfig = useOutletContext<(config: HeaderProps) => void>();
  const [allPlans, setAllPlans] = useState<PlanListItem[]>([]);
  const [ageplans, setAgePlans] = useState<RecommendedPlan[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('청년');

  // 대표 페이지용 헤더 설정
  useEffect(() => {
    setHeaderConfig({
      title: '대표페이지',
      showBackButton: false,
      showSearch: false,
      hasShadow: false,
    });
  }, [setHeaderConfig]);

  // 전체 요금제 데이터 가져오기
  useEffect(() => {
    const fetchAllPlans = async () => {
      try {
        const res = await getPlanList();
        setAllPlans(res?.data);
      } catch (err) {
        // Error handled silently
      }
    };

    fetchAllPlans();
  }, []);

  // 연령대별 추천 요금제 데이터 가져오기
  useEffect(() => {
    if (!user?.birthDay) return;

    const fetchRecommendedPlans = async () => {
      try {
        const birthday = user?.birthDay?.replace(/-/g, '');

        const res = await getRecommendedPlans(birthday.substring(0, 8));
        setAgePlans(res.data);
      } catch (err) {
        // Error handled silently
      }
    };

    fetchRecommendedPlans();
  }, [user?.birthDay]);

  // ageGroup 계산
  const getAgeGroup = (birth: string) => {
    const year = parseInt(birth.slice(0, 4)); // "19950315" → "1995"
    const age = new Date().getFullYear() - year;
    return `${Math.floor(age / 10) * 10}대`;
  };

  // 카테고리(청년, 청소년, 시니어, 일반)별 요금제 필터링 함수
  const filterPlansByCategory = (category: Category, plans: PlanListItem[]) => {
    return plans.filter((plan) => {
      const name = plan.PLAN_NAME;
      if (category === '청년') return name.includes('유쓰') || name.includes('현역병사');
      if (category === '청소년') return name.includes('청소년') || name.includes('키즈');
      if (category === '시니어') return name.includes('시니어');
      if (category === '일반') {
        return (
          !name.includes('유쓰') &&
          !name.includes('현역병사') &&
          !name.includes('청소년') &&
          !name.includes('키즈') &&
          !name.includes('시니어')
        );
      }
      return false;
    });
  };

  // 1. 유저 멤버십 뱃지
  const membershipBadge = user?.membership; // "vvip", "vip", "우수"
  const myPlan = allPlans.find((plan) => plan.PLAN_ID === user?.plan);
  const isYouthPlan = myPlan?.PLAN_NAME.includes('유쓰');

  // 2. 표기용 이름 (우측 뱃지에 보일 텍스트)
  const membershipLabel = membershipBadge; // 멤버십은 항상 표기
  const showYouth = isYouthPlan; // 유쓰는 해당할 경우만 표시

  const filteredPlans = filterPlansByCategory(selectedCategory, allPlans);
  const isLoggedIn = Boolean(user?.name && user?.plan && allPlans.length > 0 && myPlan);

  return (
    <div className="bg-background md:bg-horizontal">
      {/* 하얀색 배너 영역 */}
      <div className="relative">
        <div className="bg-white rounded-b-[32px] md:rounded-none md:shadow-none lg:h-screen md:pt-4 shadow-[0_8px_15px_-4px_rgba(0,0,0,0.1)] w-full lg:px-20 px-4 pt-2 pb-8">
          {/* lg 이상일 때: HeroSection 내용 (대표페이지용 문구와 버튼) */}
          <div className="hidden md:block">
            <HeroSection
              isLoggedIn={isLoggedIn}
              userName={user?.name}
              plan={
                myPlan
                  ? {
                      planId: myPlan.PLAN_ID,
                      name: myPlan.PLAN_NAME,
                      dataInfo: myPlan.DATA_INFO,
                      dataInfoDetail: myPlan.DATA_INFO_DETAIL,
                    }
                  : undefined
              }
            />
          </div>
          {/* lg 미만일 때: 기존 모바일 전용 내용 */}
          <div className="md:hidden">
            {user?.name && myPlan ? (
              <>
                <PlanInfoBanner
                  planName={myPlan.PLAN_NAME}
                  dataInfo={myPlan.DATA_INFO}
                  dataInfoDetail={myPlan.DATA_INFO_DETAIL}
                />
                <Link
                  to={`/compare?plan1=${user?.plan}`}
                  className="flex items-center justify-end mt-4 text-m text-black font-regular mb-[-20px]"
                >
                  다른 요금제와 비교해보기
                  <FiChevronRight className="text-lm mt-[-3px]" />
                </Link>
              </>
            ) : (
              <LoginBanner type="mainGradient" />
            )}
          </div>
        </div>
      </div>

      {/* 이벤트 영역 */}
      <div className="pt-9 md:mt-16 lg:pt-0 lg:px-20">
        <EventBannerCarousel />
      </div>

      {/* 맞춤 요금제 (로그인한 경우에만) */}
      {user?.birthDay && (
        <section className="pt-6 md:mt-28 md:ml-0">
          <div className="lg:px-20 md:mx-auto">
            <h2 className="text-lg font-semibold mb-1 lg:text-4xl lg:mb-5 px-4 lg:px-0">
              <span className="text-pink-500">{user.name}</span>님을 위한 맞춤 요금제
            </h2>

            {ageplans.length > 0 ? (
              <>
                <p className="text-m mb-1 text-zinc-700 md:text-lm md:mb-6 px-4 lg:px-0">
                  <span className="font-semibold">{getAgeGroup(user.birthDay)}</span>가 선호하는
                  요금제를 모아봤어요!
                </p>
                {/* 요금제 카드 좌측 shadow 가려지는 효과를 막기위한 마진과 패딩 추가(피그마 시안과 동일한 여백은 유지하도록) */}
                <div
                  ref={scrollRef}
                  className="overflow-x-auto h-[210px] scrollbar-hide scroll-smooth cursor-grab ml-[-2%] pl-[2%] md:h-full md:w-full md:ml-0 md:pl-0"
                >
                  <div className="flex gap-4 flex-nowrap w-max pr-4 px-4 lg:px-0">
                    {ageplans.map((plan) => (
                      <PlanCardSmall
                        key={plan.planId}
                        name={plan.name}
                        description={plan.dataInfo}
                        price={`${plan.monthlyFee.toLocaleString()}원`}
                        discountedPrice={`${calculateDiscountedPrice(plan.monthlyFee, plan.name).toLocaleString()}원`}
                        rating={{
                          score: parseFloat(plan.avgRating?.toString() || '0'),
                          count: plan.reviewCount || 0,
                        }}
                        onClick={() => navigate(`/plans/${plan.planId}`)}
                      />
                    ))}
                  </div>
                </div>
                <p className="hidden text-end text-m text-zinc-600 md:block animate-pulse mt-2">
                  좌우로 밀어보세요 →
                </p>
              </>
            ) : (
              <div className="lg:w-full text-center py-10 text-zinc-300 md:py-20 bg-white rounded-3xl my-4 mx-4">
                <p className="text-m md:text-lg font-medium">현재 맞춤 추천 요금제가 없어요.</p>
                <p className="text-sm md:text-m mt-4">
                  생년월일 정보에 맞는 요금제를 준비 중이에요.😊
                  <br />
                  잠시 후 다시 확인해주세요!
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 추천 요금제 영역 */}
      <section className="px-4 pt-2 md:mt-28 md:ml-0 lg:px-20">
        <div className="md:mx-auto">
          <h2 className="text-lg font-semibold mb-2 max-[400px]:text-[20px] md:mb-7 lg:text-4xl">
            추천 요금제
          </h2>
          {/* 카테고리 버튼 */}
          <div className="flex gap-2 mb-1 md:mb-3">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                size="lg"
                variant="fill"
                rounded="full"
                color={selectedCategory === category ? 'pink' : 'white'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* 요금제 카드 리스트 */}
          <div
            ref={scrollRef}
            className="overflow-x-auto h-[210px] scrollbar-hide scroll-smooth cursor-grab ml-[-2%] pl-[2%] md:h-full md:w-full md:ml-0 md:pl-0"
          >
            <div className="flex gap-4 flex-nowrap w-max pr-4">
              {filteredPlans.map((plan) => {
                const discounted = calculateDiscountedPrice(plan.MONTHLY_FEE, plan.PLAN_NAME);
                return (
                  <PlanCardSmall
                    key={plan.PLAN_ID}
                    name={plan.PLAN_NAME}
                    description={plan.DATA_INFO}
                    price={`${plan.MONTHLY_FEE.toLocaleString()}원`}
                    discountedPrice={`${discounted.toLocaleString()}원`}
                    rating={{
                      score: plan.RECEIVED_STAR_COUNT / Math.max(plan.REVIEW_USER_COUNT, 1),
                      count: plan.REVIEW_USER_COUNT,
                    }}
                    onClick={() => navigate(`/plans/${plan.PLAN_ID}`)}
                  />
                );
              })}
            </div>
          </div>
          <p className="hidden text-end text-m text-zinc-600 md:block animate-pulse">
            좌우로 밀어보세요 →
          </p>
        </div>
      </section>

      {/* 멤버십 혜택 영역 */}
      <div className="px-4 mx-auto pt-3 pb-16 md:mt-32 md:pb-36 md:w-full lg:px-20">
        <div className="bg-horizontal md:bg-none md:bg-fuchsia-100 rounded-[20px] lg:rounded-[36px] shadow-[0_0_12px_rgba(0,0,0,0.08)] pb-5">
          {/* 헤더: 타이틀 + 뱃지 */}
          <div className="bg-white w-full p-3 rounded-t-[20px]">
            <div className="flex items-center justify-start">
              <h2 className="text-lg font-bold px-2 max-[400px]:text-[20px] md:text-xxl md:pl-14 md:py-3 mt-2">
                나의 멤버십
              </h2>
              <div className="flex gap-2 ml-1 mt-1">
                {membershipLabel && (
                  <span className="inline-flex items-center bg-pink-500 text-white text-m max-[400px]:text-sm font-normal px-3 rounded-full leading-none h-7 md:text-lg md:h-10 md:px-5">
                    {membershipLabel}
                  </span>
                )}
                {showYouth && (
                  <span className="inline-flex items-center bg-violet-500 text-white text-m max-[400px]:text-sm font-medium px-3 rounded-full leading-none h-7 md:text-lg md:h-10 md:px-5">
                    유쓰
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 혜택 카드 리스트 + 블러 처리 */}
          <div className="space-y-3 p-5 pt-4 md:px-14">
            <p className="text-sm pb-3 px-2 md:text-lg md:py-2">
              {membershipLabel} 멤버십이 누릴 수 있는 인기 혜택이에요!
            </p>

            <div className="relative">
              {/* 비로그인일 경우 블러 레이어 표시 */}
              {!isLoggedIn && (
                <>
                  <div className="absolute inset-0 z-20 backdrop-blur-[8px] bg-white/60 rounded-[12px] pointer-events-none" />
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-sm md:text-m text-zinc-700 px-4 py-2">
                      로그인 후 확인할 수 있어요
                    </p>
                    <Button
                      variant="fill"
                      color="pink"
                      rounded="full"
                      className="pointer-events-auto mt-2"
                      onClick={() => {
                        navigate('/login');
                      }}
                    >
                      로그인
                    </Button>
                  </div>
                </>
              )}

              {/* ✅ 혜택 카드 리스트 */}
              <div className="flex flex-col gap-4 relative z-10 lg:py-5 md:h-[450px]">
                {/* 유튜브 프리미엄 */}
                <div className="flex items-center bg-white px-4 py-3 rounded-[8px] h-[81px] md:h-[140px]">
                  <img
                    src="/images/membership/youtube.png"
                    alt="유튜브"
                    className="w-12 h-12 ml-2 mr-3 md:w-24 md:h-24 md:ml-8"
                  />
                  <div className="ml-3">
                    <p className="text-s text-zinc-500 md:text-m">유튜브 프리미엄 x 넷플릭스</p>
                    <p className="text-m font-regular max-[400px]:text-sm md:text-lm">
                      국내 유일! 최대 혜택가 11,900원에 이용하세요.
                    </p>
                  </div>
                </div>

                {/* CGV */}
                <div className="flex items-center bg-white px-4 py-3 rounded-[8px] h-[81px] md:h-[140px]">
                  <img
                    src="/images/membership/cgv.png"
                    alt="CGV"
                    className="w-12 h-12 ml-2 mr-3 md:w-24 md:h-24 md:ml-8"
                  />
                  <div className="ml-3">
                    <p className="text-s text-zinc-500 md:text-m">CGV</p>
                    <p className="text-m font-regular max-[400px]:text-sm md:text-lm">
                      2D영화 장당 2,000원 할인
                    </p>
                  </div>
                </div>

                {/* 롯데시네마 */}
                <div className="flex items-center bg-white px-4 py-3 rounded-[8px] h-[81px] md:h-[140px]">
                  <img
                    src="/images/membership/lotte-cinema.png"
                    alt="롯데시네마"
                    className="w-18 h-12 mr-3 md:w-32 md:h-24 md:ml-3"
                  />
                  <div>
                    <p className="text-s text-zinc-500 md:text-m">롯데시네마</p>
                    <p className="text-m font-regular max-[400px]:text-sm md:text-lm">
                      연 6회 4,000원 할인
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
