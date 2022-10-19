import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import { ModalType, useModal } from 'src/providers/ModalProvider';
import { ViewCardModal } from './Contents/ViewCardModal';

export const Modal = () => {
  const { closeModal, isModalOpen, modalType, props } = useModal();
  const cancelButtonRef = useRef(null);

  function renderModalContents() {
    switch (modalType) {
      case ModalType.VIEWCARD:
        return <ViewCardModal card={props.card} />;
    }
  }

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 "
        initialFocus={cancelButtonRef}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg shadow-xl transition-all sm:my-8 sm:min-w-xl 
                  text-base bg-background dark:bg-[#2f2f2f] text-text-color dark:text-dark-text-color"
              >
                {renderModalContents()}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
