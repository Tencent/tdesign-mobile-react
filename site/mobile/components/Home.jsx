import React from 'react';
import {
  Collapse as TCollapse,
  CollapsePanel as TCollapsePanel,
  CellGroup as TCellGroup,
  Cell as TCell,
} from 'tdesign-mobile-react';
import { useNavigate } from 'react-router-dom';

import { AppIcon, BulletpointIcon, ViewModuleIcon, ImageIcon, InternetIcon, ChatIcon } from 'tdesign-icons-react';
import { docs as baseDocs } from '../../web/site.config';

import './style/home.less';

const iconDefault = {
  'Global Config': <InternetIcon />,
  Base: <AppIcon />,
  Navigation: <ViewModuleIcon />,
  Form: <BulletpointIcon />,
  'Data Display': <ImageIcon />,
  FeedBack: <ChatIcon />,
};

function getDocsList(docs) {
  return docs.slice(1).map((item) => ({
    ...item,
    icon: iconDefault[item.titleEn],
  }));
}

const HomePage = () => {
  const docs = getDocsList(baseDocs);
  const navigate = useNavigate();

  const onClickItem = (item) => {
    navigate(`/${item.name}?showNavBack=1`);
  };
  return (
    <div className="tdesign-mobile-home">
      <div className="tdesign-mobile-logo">
        <img src="https://tdesign.gtimg.com/site/TDesign.png" alt="logo" />
        <p>TDesign 适配 React 的移动端组件库</p>
      </div>
      {docs.map((doc, index) => (
        <TCollapse key={index} expandIcon={false}>
          <TCollapsePanel value={index} header={doc.title} expandIcon={doc.icon}>
            <TCellGroup class="collapse__content">
              {(doc.children || []).map((child, childIndex) => (
                <TCell
                  key={`child-${childIndex}`}
                  style={{ height: '56px' }}
                  title={child.title}
                  arrow
                  onClick={() => onClickItem(child)}
                ></TCell>
              ))}
            </TCellGroup>
          </TCollapsePanel>
        </TCollapse>
      ))}
    </div>
  );
};

export default HomePage;
