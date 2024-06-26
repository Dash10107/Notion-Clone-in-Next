import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react'
import { cookies } from 'next/headers';
import { getCollaboratingWorkspaces, getFolders, getPrivateWorkspaces, getSharedWorkspaces, getUserSubscriptionStatus } from '@/lib/supabase/queries';
import { redirect } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import WorkspaceDropdown from './workspace-dropdown';
import PlanUsage from './plan-usage';
import { ScrollArea } from '../ui/scroll-area';
import NativeNavigation from './native-navigation';
import FoldersDropdownList from './folders-dropdown-list';
import UserCard from './user-card';
const Sidebar =  async({params,className}:{params:{workspaceId:string};
    className?:string;}) => {
    const supabase = createServerComponentClient({cookies});
    
    const {data:{user},} = await supabase.auth.getUser();
    
    if(!user) return;

    const {data:subscriptionData,error:subscriptionError} = await getUserSubscriptionStatus(user.id);
    
    const {data:workspaceFolderData,error:foldersError } = await getFolders(params.workspaceId);
    
    if(subscriptionError || foldersError) redirect("/dashboard");
    
    const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
    await Promise.all([
      getPrivateWorkspaces(user.id),
      getCollaboratingWorkspaces(user.id),
      getSharedWorkspaces(user.id),
    ]);


  return (
    <aside
    className={twMerge(
      'hidden sm:flex sm:flex-col w-[300px] shrink-0 p-4 md:gap-4 !justify-between',
      className
    )}
  >
    <div>
    <WorkspaceDropdown
          privateWorkspaces={privateWorkspaces}
          sharedWorkspaces={sharedWorkspaces}
          collaboratingWorkspaces={collaboratingWorkspaces}
          defaultValue={[
            ...privateWorkspaces,
            ...collaboratingWorkspaces,
            ...sharedWorkspaces,
          ].find((workspace) => workspace.id === params.workspaceId)}
        />
                <PlanUsage
          foldersLength={workspaceFolderData?.length || 0}
          subscription={subscriptionData}
        />
         <NativeNavigation myWorkspaceId={params.workspaceId} />
         <ScrollArea
          className="overflow-scroll relative
          h-[450px]
          no-scrollbar
        "
        >
          <div
            className="pointer-events-none 
          w-full 
          absolute 
          bottom-0 
          h-20 
          bg-gradient-to-t 
          from-background 
          to-transparent 
          z-40"
          />
          <FoldersDropdownList
            workspaceFolders={workspaceFolderData || []}
            workspaceId={params.workspaceId}
          />
        </ScrollArea>
    </div>
    <UserCard subscription={subscriptionData} />
  </aside>
  )
}

export default Sidebar
