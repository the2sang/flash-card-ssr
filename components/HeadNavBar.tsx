"use client"

import { useRouter} from "next/navigation";
import Link from "next/link";


function HeadNavBar() {

  const router = useRouter();

  return (
    <>
      <div className="navbar bg-white z-10">
        <div className="flex-1 left-0 ml-2">
          <svg fill="#000000" width="30px" height="30px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>alt-menu</title>
            <path d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v20zM4 26.016v-20q0-0.832 0.576-1.408t1.44-0.608h20q0.8 0 1.408 0.608t0.576 1.408v20q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408zM8 24h16v-4h-16v4zM8 18.016h16v-4h-16v4zM8 12h16v-4h-16v4z"></path>
          </svg>
          <button onClick={() => router.push('/')} className="btn btn-ghost normal-case text-xl">Flash Card Learning</button>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><button onClick={() => router.push('/')}  >학습하기</button></li>
            <li tabIndex={0}>
              <a>
                코드관리
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
              </a>
              <ul className="p-2 bg-base-100 z-50">
                <li><button type="button" onClick={() => router.push('MainCategory')}>대분류코드</button> </li>
                {/*<li><Link href={'/MainCategory.tsx'} >대분류</Link></li>*/}
                <li><button type="button" onClick={() => router.push('MiddleCategory')}>중분류코드</button> </li>
              </ul>
            </li>
            <li><a>학습관리</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default HeadNavBar;