import React, { FC, useContext } from 'react'
import Context from 'WNTR/utils/context'
import { Form as BSForm, Button, Container, Row, Col } from 'react-bootstrap'
import { IField, IForm, IHTMLFormElement } from 'WNTR/interfaces'

const Form: FC<IForm> = (block) => {
    
    const handleSubmit = async (event: React.FormEvent<IHTMLFormElement>) => {
        event.preventDefault()
        //setSubmitting(true)

        const data: { [key: string]: string } = {}

        block.allFields.map(field => data[field?.alias] = event.currentTarget.elements[field.alias]?.value)

        //await axios.post('/api/form/submit', data, { headers: { 'Id': form.id } }).then(res => {
        //    if(res.data) {
        //        setSubmitted(true)
        //    }
        //})

        console.log(data)
    }

    return (
        <article className={block.alias}>
            <Container>
                <Row>
                    <Col xs={12} lg={{ offset: 2, span: 8 }} xl={{ offset: 3, span: 6 }}>
                        <BSForm id={block.id} onSubmit={handleSubmit} data-success-message={block.messageOnSubmit}>
                            <h2>{block.name}</h2>
                            {block.containers.map(container => 
                                <Container key={container.id}>
                                    <Row hidden={!container.caption}>
                                        <Col xs={12}>
                                            <h3>{container.caption}</h3>
                                        </Col>
                                    </Row>
                                    {container.rows.map(row => 
                                        <Row key={row.id} data-condition={row.condition} data-sort={row.sortOrder}>
                                            <Col xs={12} hidden={!row.caption}>
                                                <h4>{row.caption}</h4>
                                            </Col>
                                            {row.cols.map((col,i) =>
                                                <Col key={i} xs={12} lg={col.width}>
                                                    {col.fields.map(field =>
                                                        <FormField
                                                            key={field.id}
                                                            {...field}
                                                            fieldType={block.fieldTypes[field.fieldTypeId]}
                                                            blockAlias={block.alias}    
                                                        />
                                                    )}
                                                </Col>
                                            )}
                                        </Row>
                                    )}
                                </Container>
                            )}
                            <BSForm.Group className={`${block.alias}__field`}>
                                <Button className={`${block.alias}__button`} type="submit">{block.submitLabel}</Button>
                            </BSForm.Group>
                        </BSForm>
                    </Col>
                </Row>
            </Container>
        </article>
    )
}

const FormField: FC<IField> = (field) => {
    const controls: { [key: string]: any } = {
        "shortAnswer": ShortAnswer,
        "dropdown": Dropdown,
        "longAnswer": LongAnswer
    }
    const Control = controls[field.fieldType]
    return <Control {...field} />
}

const ShortAnswer: FC<IField> = (field) => {
    return (
        <BSForm.Group className={`${field.blockAlias}__field`} controlId={field.id}>
            <BSForm.Label className={`${field.settings.showLabel ? null : 'visually-hidden'}`}>{field.caption}</BSForm.Label>
            <BSForm.Control
                type={field.settings.fieldType}
                name={field.alias}
                placeholder={field.placeholder}
                disabled={field.submitting}
                required={field.mandatory}
            />
        </BSForm.Group>
    )
}

const Dropdown: FC<IField> = (field) => {
    const context = useContext(Context)
    return (
        <BSForm.Group className={`${field.blockAlias}__field`} controlId={field.id}>
            <BSForm.Label className={`${field.settings.showLabel ? null : 'visually-hidden'}`}>{field.caption}</BSForm.Label>
            <BSForm.Select
                onLoad={e => console.log(e.currentTarget.value)}
                aria-label={field.caption}
                name={field.alias}
                disabled={field.submitting}
                defaultValue={context.page.name.toLocaleLowerCase()}
                required={field.mandatory}>
                <option disabled>Select {field.caption}</option>
                {field.preValues.map((prevalue, i) =>
                    <option key={i} value={prevalue.value}>{prevalue.caption}</option>
                )}
            </BSForm.Select>
        </BSForm.Group>
    )
}

const LongAnswer: FC<IField> = (field) => {
    return (
        <BSForm.Group className={`${field.blockAlias}__field`} controlId={field.id}>
            <BSForm.Label className={`${field.settings.showLabel ? null : 'visually-hidden'}`}>{field.caption}</BSForm.Label>
            <BSForm.Control
                as="textarea"
                name={field.alias}
                rows={field.settings.numberOfRows}
                placeholder={field.placeholder}
                disabled={field.submitting}
                required={field.mandatory}
            />
        </BSForm.Group>
    )
}

export default Form