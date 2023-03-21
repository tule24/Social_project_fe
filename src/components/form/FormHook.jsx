import React from 'react'
import { useField } from 'formik'
import styles from '@/styles/Form.module.css'

export const MyTextInput = ({ label, IconComp, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props)

    return (
        <>
            {label && <label htmlFor={label} className='font-semibold mt-5'>{label}</label>}
            <div className={styles.input_group}>
                <input {...field} {...props} className={styles.input_text} />
                {IconComp}
            </div>
            {meta.touched && meta.error ? (
                <div className="error text-red-500 text-sm">{meta.error}</div>
            ) : null}
        </>
    )
}

export const MyCheckbox = ({ children, ...props }) => {
    // React treats radios and checkbox inputs differently other input types, select, and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div className='form-group form-check'>
            <label className="checkbox-input">
                <input type="checkbox" className='form-check-input' {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error text-red-500 text-sm">{meta.error}</div>
            ) : null}
        </div>
    )
}

export const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className='form-group space-y-1 text-sm mb-5'>
            <label htmlFor={props.id || props.name} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>{label}</label>
            <select className='form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error text-red-500 text-sm">{meta.error}</div>
            ) : null}
        </div>
    )
}