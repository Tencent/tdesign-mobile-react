import { useDrag } from "@use-gesture/react";
import { FC, RefObject, useRef } from "react";
import useConfig from "tdesign-mobile-react/_util/useConfig";

interface HandleProps {
    value: number;
    min: number;
    max: number;
    disabled: boolean;
    onDrag: (value: number, first: boolean, last: boolean) => void;
    barRef: RefObject<HTMLDivElement>;
}

const Handle: FC<HandleProps> = props => {

    const {
        value,
        min,
        max,
        disabled,
        onDrag,
        barRef
    } = props;

    const { classPrefix } = useConfig();
    const name = `${classPrefix}-slider`;

    const preValue = useRef(0);

    const currentPosition = () => {
        return {
          left: `${((value - min) / (max - min)) * 100}%`,
          right: 'auto',
        }
    }

    const bind = useDrag(
        ({first, last, xy, initial}) => {
            if (disabled) return;
            if (first) {
                preValue.current = value;
            }
            const x = xy[0] - initial[0];
            const sliderOffsetWidth = barRef.current?.offsetWidth;
            if (!sliderOffsetWidth) return;
            const diff = (x / Math.ceil(sliderOffsetWidth) * (max - min));
            onDrag(preValue.current + diff, first, last);
        },
        {
            axis: 'x',
            pointer: { touch: true },
        }
    )

    return (
        <div
            className={`${name}__handle`}
            style={currentPosition()}
            {...bind()}
        />
    )
}

export default Handle;