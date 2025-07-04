import Header from './components/Header';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import ChatbotButton from './components/ChatbotButton';
import { validateToken } from './apis/auth';
import { clearUser, setUser } from './store/userSlice';
import { formatToKST } from './utils/formatDate';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { Loading } from './components/Loading';
import ScrollToTop from './components/scrollToTop';

const Default = () => {
  const [headerConfig, setHeaderConfig] = useState({
    title: '대표페이지',
    showBackButton: false,
    showSearch: false,
    hasShadow: false,
  });
  const [userLoading, setUserLoading] = useState(false);
  const navigate = useNavigate();
  const [checkOnboarding, setCheckOnboarding] = useState(false);

  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.user.isLogin);

  const { pathname } = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUserLoading(true);
        const res = await validateToken();
        const { user } = res.data;
        if (res && user) {
          const { email, birthDay, id, membership, name, plan } = user;
          //한국 날짜로
          const korBirthDay = formatToKST(birthDay);
          dispatch(
            setUser({
              id,
              name,
              birthDay: korBirthDay,
              email,
              plan,
              membership,
            })
          );
        } else {
          dispatch(clearUser());
        }
      } catch (err) {
        dispatch(clearUser());
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, [dispatch, isLogin]);

  // 온보딩 확인
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('onboarding');
    if (!hasSeenOnboarding) {
      navigate('/onboarding');
    } else {
      setCheckOnboarding(true);
    }
  }, []);

  //온보딩 아직 체크 중이거나 사용자 로딩 중일 때
  if (!checkOnboarding || userLoading) {
    return (
      <div className="text-center mt-10">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[100vh]">
      <ScrollToTop />
      {/* 헤더 */}
      <Header
        title={headerConfig.title}
        showBackButton={headerConfig.showBackButton}
        showSearch={headerConfig.showSearch}
        hasShadow={headerConfig.hasShadow}
      />

      {/* 메인 콘텐츠 */}
      <main className="flex-grow pt-16">
        <div className="min-h-[calc(100vh-64px)]">
          {/* 64px는 Header 높이 */}
          <Outlet context={setHeaderConfig} />
        </div>
      </main>

      {/* 챗봇 버튼 (고정된 위치에 표시됨) */}
      {pathname !== '/chatbot' && <ChatbotButton />}

      {/* 푸터 */}
      {pathname !== '/chatbot' && <Footer />}
    </div>
  );
};

export default Default;
