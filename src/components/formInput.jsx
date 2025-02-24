import React from 'react'
import { Form } from "react-bootstrap"

const FormInput = ({errors,  attributes, type, placeholder}) => {

    return (<>
        <Form.Group className="mb-3 w-100">
            {errors && (
                <Form.Label style={{ color: "red" }}>
                    {errors?.message}
                </Form.Label>)}
            <Form.Control
                className='form-input'
                style={Boolean(errors?.message) ? { borderColor: "red" } : { borderColor: "" }}
                {...attributes}
                type={type}
                placeholder={placeholder}/>
        </Form.Group>
    </>)
}

export default FormInput
