import React from 'react'
import { useDispatch } from 'react-redux';
import styles from 'UI/Modal/Modal.module.css';
import { Modal } from 'react-bootstrap';
import { hideModal } from 'UI/Modal/ModalSlice';

const ModalComponent = ( props ) =>
{
    const dispatch = useDispatch();
    const preventPropagation = ( event ) =>
    {
        event.stopPropagation()
    }

    return (
        <div
            style={{
                height: "100%", width: "100%", backgroundColor: "black", zIndex: "100", opacity: "1", marginTop: "100px"
            }}

            onClick={() =>
            {
                dispatch( hideModal() );
            }}
        >
            <Modal
                show={props.show}
                onClick={( event ) => preventPropagation( event )}>
                <Modal.Header
                    className={styles.modalHeader}>
                    <Modal.Title
                        className={styles.floatRight}>
                        {props.title}
                    </Modal.Title>
                    {props.escapeIcon}
                </Modal.Header>
                <Modal.Body >
                    {
                        props.children
                    }
                    <br />
                </Modal.Body>
            </Modal>
        </div >


    );

};

export default ModalComponent;