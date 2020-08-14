import React from 'react';
import { Row, Col, Tooltip  } from 'antd';
import scene01 from './img/scene_img_01.png';
import scene02 from './img/scene_img_02.png';
import scene03 from './img/scene_img_03.png';
import './windingStatus.less';

const WindingStatus = (props) => {
  const { hashInfo, img } = props;
  return (
    <div className='windingItem'>
      <Row type='flex' align='middle'>
        <Col span={6}>
          <div className="windingItem-img">
            { img && img === "img_01" && <img src={scene01} alt=""/> }
            { img && img === "img_02" && <img src={scene02} alt=""/> }
            { img && img === "img_03" && <img src={scene03} alt=""/> }
          </div>
        </Col>
        <Col span={18}>
          <div  className='windingItem-hash single-line'>
            公共账本哈希：
            <Tooltip title={!hashInfo || !hashInfo.pubHash ? '': hashInfo.pubHash} overlayClassName="windingstatus-tooltip">
            {/* !hashInfo || !hashInfo.pubHash? '':hashInfo.pubHash */}
            { !hashInfo || !hashInfo.pubHash? '': `${hashInfo.pubHash.substring(0,4)}······${hashInfo.pubHash.substring(hashInfo.pubHash.length-7)}` }
            </Tooltip>
          </div>
          
          <div  className='windingItem-hash single-line'>   
            私有账本哈希：
            <Tooltip title={ !hashInfo || !hashInfo.priHash? '':hashInfo.priHash } overlayClassName="windingstatus-tooltip">
            {/* !hashInfo || !hashInfo.priHash? '':hashInfo.priHash */}
            { !hashInfo || !hashInfo.priHash? '': `${hashInfo.priHash.substring(0,4)}······${hashInfo.priHash.substring(hashInfo.priHash.length-7)}` }
            </Tooltip>
          </div>
          
        </Col>
      </Row>              
    </div>
  )
}
export default WindingStatus