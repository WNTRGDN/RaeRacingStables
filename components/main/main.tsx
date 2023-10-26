import React, { FC, useContext } from 'react'
import Context from 'WNTR/utils/context'
import { Block } from 'WNTR/components'

const Main: FC = () => {
    const context = useContext(Context)
    return (
        <main>
            {context.page.blocks?.length ? context.page.blocks.sort((a,b) => { return a.order - b.order }).map((block, index) => <Block key={index} {...block} />) : null}
        </main>
    )
}

export default Main