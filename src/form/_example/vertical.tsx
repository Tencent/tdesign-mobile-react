import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  Cascader,
  DateTimePicker,
  Form,
  Input,
  Popup,
  Radio,
  RadioGroup,
  Rate,
  Stepper,
  Textarea,
  Upload,
  type UploadFile,
} from 'tdesign-mobile-react';
import { BrowseOffIcon } from 'tdesign-icons-react';

const RATE_GAP = 8;

const action = 'https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo';

const initialPhoto: UploadFile[] = [
  {
    url: 'https://tdesign.gtimg.com/mobile/demos/example4.png',
    name: 'uploaded1.png',
    type: 'image',
  },
  {
    url: 'https://tdesign.gtimg.com/mobile/demos/example6.png',
    name: 'uploaded2.png',
    type: 'image',
  },
];

const initialData = {
  name: '',
  password: '',
  gender: '',
  birth: '',
  place: '',
  age: 3,
  description: 2,
  resume: '',
  photo: initialPhoto,
};

const addressOptions = [
  {
    label: '北京市',
    value: '110000',
    children: [
      {
        value: '110100',
        label: '北京市',
        children: [
          { value: '110101', label: '东城区' },
          { value: '110102', label: '西城区' },
          { value: '110105', label: '朝阳区' },
          { value: '110106', label: '丰台区' },
          { value: '110107', label: '石景山区' },
          { value: '110108', label: '海淀区' },
          { value: '110109', label: '门头沟区' },
          { value: '110111', label: '房山区' },
          { value: '110112', label: '通州区' },
          { value: '110113', label: '顺义区' },
          { value: '110114', label: '昌平区' },
          { value: '110115', label: '大兴区' },
          { value: '110116', label: '怀柔区' },
          { value: '110117', label: '平谷区' },
          { value: '110118', label: '密云区' },
          { value: '110119', label: '延庆区' },
        ],
      },
    ],
  },
  {
    label: '天津市',
    value: '120000',
    children: [
      {
        value: '120100',
        label: '天津市',
        children: [
          { value: '120101', label: '和平区' },
          { value: '120102', label: '河东区' },
          { value: '120103', label: '河西区' },
          { value: '120104', label: '南开区' },
          { value: '120105', label: '河北区' },
          { value: '120106', label: '红桥区' },
          { value: '120110', label: '东丽区' },
          { value: '120111', label: '西青区' },
          { value: '120112', label: '津南区' },
          { value: '120113', label: '北辰区' },
          { value: '120114', label: '武清区' },
          { value: '120115', label: '宝坻区' },
          { value: '120116', label: '滨海新区' },
          { value: '120117', label: '宁河区' },
          { value: '120118', label: '静海区' },
          { value: '120119', label: '蓟州区' },
        ],
      },
    ],
  },
];

const onFail = ({ file, e }: any) => {
  console.log('[onFail]', { file, e });
};

const onProgress = ({ file, percent, type, e }: any) => {
  console.log('[onProgress]', { file, percent, type, e });
};

const onPreview = ({ file, e }: any) => {
  console.log('[onPreview]', { file, e });
};

const onSuccess = ({ file, fileList, response, e }: any) => {
  console.log('[onSuccess]', { file, fileList, e, response });
};

const onRemove = ({ index, file, e }: any) => {
  console.log('[onRemove]', { index, file, e });
};

const onSelectChange = (files: UploadFile[]) => {
  console.log('[onSelectChange]', files);
};

export default function VerticalForm({ disabled }: { disabled?: boolean }) {
  const [form] = Form.useForm();
  const [birthVisible, setBirthVisible] = useState(false);
  const [placeVisible, setPlaceVisible] = useState(false);
  const [placeValue, setPlaceValue] = useState<string | number>('120119');
  const birthInputRef = useRef<any>(null);
  const placeInputRef = useRef<any>(null);

  useEffect(() => {
    if (!birthVisible) {
      birthInputRef.current?.blur?.();
    }
  }, [birthVisible]);

  useEffect(() => {
    if (!placeVisible) {
      placeInputRef.current?.blur?.();
    }
  }, [placeVisible]);

  const rules = useMemo(
    () => ({
      name: [{ validator: (val: any) => val?.length === 8, message: '只能输入8个字符英文' }],
      password: [{ validator: (val: any) => val?.length > 6, message: '长度大于6个字符' }],
      gender: [{ validator: (val: any) => val !== '', message: '不能为空' }],
      birth: [{ validator: (val: any) => val !== '', message: '不能为空' }],
      place: [{ validator: (val: any) => val !== '', message: '不能为空' }],
      description: [{ validator: (val: any) => val > 3, message: '分数过低会影响整体评价' }],
      resume: [{ validator: (val: any) => val !== '', message: '不能为空' }],
    }),
    [],
  );

  const groupChangeFn = (value: any, context: any) => {
    console.log(value, context);
  };

  const onBirthChange = (value: any) => {
    console.log('[change]', value);
  };

  const onBirthPick = (value: any) => {
    console.log('[pick]', value);
  };

  const onBirthCancel = () => {
    console.log('[cancel]');
    setBirthVisible(false);
  };

  const onBirthConfirm = (value: any) => {
    console.log('[confirm]', value);
    form.setFieldsValue({ birth: String(value) });
    setBirthVisible(false);
  };

  const onPlaceChange = (value: string | number, selectedOptions: any) => {
    setPlaceValue(value);
    setPlaceVisible(false);
    form.setFieldsValue({ place: selectedOptions?.map((item: any) => item.label).join('/') });
  };

  const onReset = () => {
    console.log('[onReset]');
  };

  const onSubmit = (e: any) => {
    console.log('[onSubmit]', e);
  };

  return (
    <>
      <Form
        form={form}
        initialData={initialData}
        showErrorMessage
        resetType="empty"
        labelAlign="top"
        scrollToFirstError="auto"
        disabled={disabled}
        rules={rules}
        onReset={onReset}
        onSubmit={onSubmit}
      >
        <Form.FormItem label="用户名" name="name" help="输入用户名">
          <Input borderless placeholder="请输入内容" />
        </Form.FormItem>
        <Form.FormItem label="密码" name="password">
          <Input borderless type="password" placeholder="请输入内容" suffixIcon={<BrowseOffIcon />} />
        </Form.FormItem>
        <Form.FormItem label="性别" name="gender">
          <RadioGroup className="box" borderless onChange={groupChangeFn}>
            <Radio block={false} name="radio" value="man" label="男" />
            <Radio block={false} name="radio" value="women" label="女" />
            <Radio block={false} name="radio" value="secret" label="保密" />
          </RadioGroup>
        </Form.FormItem>
        <Form.FormItem arrow label="生日" name="birth">
          <Input
            ref={birthInputRef}
            borderless
            readonly
            placeholder="请输入内容"
            onFocus={() => {
              setBirthVisible(true);
            }}
          />
        </Form.FormItem>
        <Form.FormItem arrow label="籍贯" name="place">
          <Input
            ref={placeInputRef}
            borderless
            readonly
            placeholder="请输入内容"
            onFocus={() => {
              setPlaceVisible(true);
            }}
          />
        </Form.FormItem>
        <Form.FormItem label="年限" name="age">
          <Stepper theme="filled" />
        </Form.FormItem>
        <Form.FormItem label="自我评价" name="description">
          <Rate allowHalf showText={false} gap={RATE_GAP} />
        </Form.FormItem>
        <Form.FormItem label="个人简介" name="resume">
          <Textarea className="textarea" indicator maxlength={50} placeholder="请输入个人简介" />
        </Form.FormItem>
        <Form.FormItem label="上传照片" name="photo">
          <Upload
            className="upload"
            multiple
            max={8}
            action={action}
            defaultFiles={initialPhoto}
            onFail={onFail}
            onProgress={onProgress}
            onPreview={onPreview}
            onSuccess={onSuccess}
            onRemove={onRemove}
            onSelectChange={onSelectChange}
          />
        </Form.FormItem>
        <div className="button-group">
          <Button theme="primary" type="submit" size="large">
            提交
          </Button>
          <Button theme="default" variant="base" type="reset" size="large">
            重置
          </Button>
        </div>
      </Form>

      <Popup visible={birthVisible} placement="bottom" onVisibleChange={(v) => setBirthVisible(v)}>
        <DateTimePicker
          mode="date"
          title="选择日期"
          start="2015-5-5"
          format="YYYY-MM-DD"
          onChange={onBirthChange}
          onPick={onBirthPick}
          onConfirm={onBirthConfirm}
          onCancel={onBirthCancel}
        />
      </Popup>

      <Cascader
        title="选择地址"
        value={placeValue}
        visible={placeVisible}
        options={addressOptions}
        onChange={onPlaceChange}
        onClose={() => {
          setPlaceVisible(false);
        }}
      />
    </>
  );
}
