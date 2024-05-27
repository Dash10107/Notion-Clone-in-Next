import MobileSidebar from '@/components/sidebar/mobile-sidebar'
import Sidebar from '@/components/sidebar/sidebar'
import React from 'react'



const Layout =  ({ children,params }: { children: React.ReactNode,params:any }) => {
  return (
    <main className="flex overflow-hidden
    h-screen
    w-screen">
        <Sidebar params={params}/>
        <MobileSidebar>
        <Sidebar
          params={params}
          className="w-screen inline-block sm:hidden"
        />
      </MobileSidebar>
   
      <div
        className="dark:boder-Neutrals-12/70
        border-l-[1px]
        w-full
        relative
        overflow-scroll
      "
      >
           {children}
           </div>
    </main>
  )
}

export default Layout
