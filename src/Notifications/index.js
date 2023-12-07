import React, { Fragment, useState, createContext } from 'react'
import { Transition } from '@headlessui/react'
import { TbChristmasTree } from "react-icons/tb";
import { MdClose } from "react-icons/md";

const NotificationsComponent = () => {
  const notificationsCtx = React.useContext(NotificationsContext);
  if (!notificationsCtx) {
    throw new Error(
      "You probably forgot to put <NotificationsProvider> on top of your app"
    );
  }
  const [notifications, setNotifications] = notificationsCtx;
  const currentDate = new Date();

  return (
    <>
      {(notifications.status === true && currentDate >= notifications.startDate && currentDate <= notifications.endDate) && (
        <div
          aria-live="assertive"
          className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
        >
          <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            <Transition
              show={notifications.show}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="pointer-events-auto w-full max-w-lg overflow-hidden rounded-lg bg-blue-50 shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <TbChristmasTree className="h-16 w-16 text-orange-500" aria-hidden="true" />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="p-0 text-lg text-blue-600 font-semibold">{notifications.title}</p>
                      <div className="mt-1 text-sm text-gray-500"
                        dangerouslySetInnerHTML={{
                          __html: notifications.message,
                        }}></div>
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex rounded-md bg-orange-500 text-white hover:bg-blue-600 focus:outline-none"
                        onClick={() => {
                          setNotifications({
                            ...notifications,
                            show: false,
                          });
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <MdClose className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>  
      )}
    </>
  )
}

export const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
  const [state, setState] = useState({
    status: process.env.NEXT_PUBLIC_NOTIFICATION_STATUS === "true" ? true : false,
    title: process.env.NEXT_PUBLIC_NOTIFICATION_TITLE,
    message: process.env.NEXT_PUBLIC_NOTIFICATION_BODY,
    show: process.env.NEXT_PUBLIC_NOTIFICATION_OPEN === "true" ? true : false,
    startDate: new Date(process.env.NEXT_PUBLIC_NOTIFICATION_START_DATE),
    endDate: new Date(process.env.NEXT_PUBLIC_NOTIFICATION_END_DATE),
  });

  return (
    <NotificationsContext.Provider value={[state, setState]}>
      {children}
      <NotificationsComponent />
    </NotificationsContext.Provider>
  );
}