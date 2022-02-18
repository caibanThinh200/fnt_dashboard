import clsx from 'clsx'
import { Fragment, useEffect, useState } from 'react'

const Wrapper = ({
    children,
    hoverable,
    className,
    bordered,
    shadow,
    radius,
    AosAnimation,
    typeComponents,
    hasBackground,
    ...rest
}) => {
    const [dataAos, setDataAos] = useState('')

    useEffect(() => {
        setDataAos(AosAnimation)
    }, [AosAnimation])

    return (
        <Fragment>
            <div
                {...rest}
                data-aos={dataAos}
                className={clsx(
                    className,
                    hoverable && 'furniture-wrapper--hover',
                    shadow && 'furniture-wrapper--shadow',
                    radius && 'furniture-wrapper--radius',
                    bordered && 'furniture-wrapper--bordered',
                    hasBackground && "furniture-wrapper",
                    
                )}
            >
                {children}
            </div>
        </Fragment>
    )
}

export default Wrapper
