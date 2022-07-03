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

function ModalDelete(props) {

  return (
    <>
      <Modal
        isOpen={props.state.confirmDelete}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="lg" fontWeight="bold">
            {props.state.title}
          </ModalHeader>
          <ModalCloseButton onClick={props.state.onBtnCancel} />

          <ModalBody>
            Are you sure to delete it? You can't undo this action afterwards.
          </ModalBody>

          <ModalFooter>
            <Button onClick={props.state.onBtnCancel}>
              Cancel
            </Button>
            <Button onClick={props.state.onConfirmDelete} colorScheme={"red"} color="white" ml={3}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalDelete