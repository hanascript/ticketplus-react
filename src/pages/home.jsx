import { AuthButtons } from '../components/auth/auth';
import { Header } from '../components/header';
import { HomeRecommendations } from '../components/movies/home-recommendations';
import { SignInPopup } from '../components/popup/signin-popup';
import { SignUpPopup } from '../components/popup/signup-popup';

export default function Home() {
  return (
    <>
      <AuthButtons />
      <Header />
      <HomeRecommendations />
      <SignInPopup />
      <SignUpPopup />
    </>
  );
}
