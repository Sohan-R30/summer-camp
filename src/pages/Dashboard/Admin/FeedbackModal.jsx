import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";


const FeedbackModal = ({ setIsOpen, isOpen,handleSendFeedBack,setGiveFeedback,id }) => {
    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-70 blur-md" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Give Feedback
                                    </Dialog.Title>
                                    <div className="mt-2 py-5">
                                        <textarea
                                            onBlur={(e) => setGiveFeedback(e.target.value)}
                                            className="outline-none border w-full p-2"
                                            name="feedback" id="feedback" rows="4"
                                        ></textarea>
                                    </div>

                                    <div className="mt-4 flex justify-between">
                                        <button
                                            type="button"
                                            className="border border-transparenttext-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 bg-[#83e0f5] py-2 px-3  hover:bg-[#7f9a9f] hover:text-white rounded-lg"
                                            onClick={() => handleSendFeedBack(id)}
                                        >
                                            send feedback
                                        </button>
                                        <button
                                            type="button"
                                            className="border border-transparenttext-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 bg-[#83e0f5] py-2 px-3  hover:bg-[#7f9a9f] hover:text-white rounded-lg"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default FeedbackModal;