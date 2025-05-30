'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface ConfirmationModalProps {
  isOpen: boolean
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmationModal({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onCancel} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
              <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
              <Dialog.Description className="text-sm text-gray-600 mt-2">
                {description}
              </Dialog.Description>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Confirmar
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
