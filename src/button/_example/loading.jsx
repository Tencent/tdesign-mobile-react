import React, {useState} from 'react';
import { Button } from 'tdesign-mobile-react';

export default function ({ disabled }) {
    const [loading, setLoading] = useState(false)

    const mockSubmit = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2e3);
    }

    return (
        <div className="button-demo flex">
            <Button size="large" shape="square" theme="primary" loading disabled={disabled}></Button>
            <Button size="large" shape="rectangle" theme="primary" loading disabled={disabled}>加载中...</Button>
            <Button size="large" theme="primary" loading={loading} shape="rectangle" disabled={disabled} onClick={mockSubmit} >
                {loading ? 'loading' : 'Click me!'}
            </Button>
        </div>
    )
}
