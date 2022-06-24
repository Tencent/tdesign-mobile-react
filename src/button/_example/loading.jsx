import React, {useState} from 'react';
import { Button } from 'tdesign-mobile-react';

export default () => {
    const [loading, setLoading] = useState(false)

    const mockSubmit = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2e3);
    }

    return (
        <div className="button-demo">
            <Button loading theme="primary" disabled />
            <Button loading theme="primary" disabled >
                Loading
            </Button>
            <Button 
                block
                theme="primary"
                loading={loading} 
                onClick={mockSubmit}
            >
                {loading ? 'loading' : 'Click me!'}
            </Button>
        </div>
    )
}