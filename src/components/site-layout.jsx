import { Outlet } from 'react-router';
import { SideBar } from './sidebar';

export default function SiteLayout() {
  return (
    <div className='flex'>
      <SideBar />
      <main className='content-container'>
        <Outlet />
      </main>
    </div>
  );
}
