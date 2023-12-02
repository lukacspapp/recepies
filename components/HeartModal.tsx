import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Link from "next/link";

export default function HeartModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <label className="flex items-center cursor-pointer m-1"
        onClick={onOpen}
      >
        <input
          type="checkbox"
          className="hidden"
        />
        <div className="relative p-2 w-6 h-5">
          <svg
            viewBox="0 0 24 24"
            fill={'none'}
            stroke={'currentColor'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ${'opacity-0'
              }`}
          >
            <path d="M12 21.35l-1.45-1.32C5.5 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ${'opacity-100'
              }`}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </label>
      <Modal placement='center' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Login Required</ModalHeader><ModalBody>
                <p>
                    You need to log in to like meals. If you don&apos;t have an account, you can sign up for free!
                </p>
              </ModalBody>
              <ModalFooter>
                <Link href="/login">
                  <Button color="default" onPress={onClose}>
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button color="primary" onPress={onClose}>
                    Sign Up
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
