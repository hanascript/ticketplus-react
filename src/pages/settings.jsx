import { HomeContent } from '../components/home';
import { SideBar } from '../components/sidebar';

export default function Settings() {
  return (
    <div className='flex'>
      <SideBar />
      <main>
        <HomeContent />
      </main>
    </div>
  );
}
