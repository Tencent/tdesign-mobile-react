import React, {useState} from 'react';
import { Button } from 'tdesign-mobile-react';

export default () => (
    <div className="button-demo">
        <Button type="reset" children="Reset" theme="danger" variant="outline" />
        <Button type="submit" children="Submit" theme="danger" />
        <Button type="button" children="Button" theme="primary" />
    </div>
)