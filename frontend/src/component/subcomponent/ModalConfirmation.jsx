import React from "react";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,



} from "@chakra-ui/react"

export default function Confirmation(props) {

  return (
    <>
      <Modal
        isOpen={props.state.confirm}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="lg" fontWeight="bold">
            Action Confirmation
          </ModalHeader>
          <ModalCloseButton onClick={props.state.onBtnClose} />

          <ModalBody>
            Are you sure to do this?
          </ModalBody>

          <ModalFooter>
            <Button onClick={props.state.onBtnNo} colorScheme={"red"} color="white" ml={3}>
              No
            </Button>
            <Button onClick={props.state.onBtnYes} colorScheme={"green"} color="white" ml={3}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

