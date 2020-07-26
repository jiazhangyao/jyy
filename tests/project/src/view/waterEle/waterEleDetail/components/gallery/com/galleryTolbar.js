/**
 * Created by SUNXIAOPEI138 on 2018/5/17.
 */
import React from 'react';
export default ({ onZoomIn, onZoomOut, onRotate, ShowIcon }) => {
    return (
        <div className="tool-bar">
            {
                ShowIcon.zoomInIcon &&
                <a onClick={onZoomIn}>
                    <i className="icon iconfont icon-font-expand">&#xe7c9;</i>
                </a>
            }
            {
                ShowIcon.zoomOutIcon &&
                <a onClick={onZoomOut}>
                    <i className="icon iconfont icon-font-expand">&#xe7c7;</i>
                </a>
            }
        </div>
    )
}