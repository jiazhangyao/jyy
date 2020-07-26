import React, { PropTypes } from 'react';
import { Checkbox, Card } from 'antd';
import _ from 'underscore';
import { DetailField } from "components";
import './index.less';

const CheckboxGroup = Checkbox.Group;

function mixData(allRoles, value) {
  return allRoles.map(role => {
    if (role.children && role.children.length) {
      role.children.map(cur => {
        cur.value = cur.id;
        cur.label = cur.name;
      })

      let checkedRoles = _.intersection(_.pluck(role.children, 'id'), value) || [];
      return {
        ...role,
        checkedRoles
      };
    } else {
      role.value = role.id;
      role.label = role.name;
      return { ...role, isSelected: value.includes(role.id) };
    }
  });
}

function checkIsAll(roles, checkedRoles) {
  return checkedRoles.length === roles.length;
}

function checkIsPartial(roles, checkedRoles) {
  return !!checkedRoles.length && (checkedRoles.length < roles.length);
}

function getModuleIndexByKey(key, datasource) {
  return datasource.findIndex(item => item.key === key);
}

function getValueFromMixedData(data) {
  return data.reduce(
      (roles, module) => {
        if (module.checkedRoles && module.checkedRoles.length) {
          let currentRoles = module.checkedRoles;
          roles = [...roles, module.id, ...currentRoles];
        }
        else if (module.isSelected) {
          roles.push(module.value);
        }
        return roles;
      },
      []
  );
}

function buildDirectMap(topModules) {
  return topModules.reduce(
      (map, topModule) => {
        if (topModule.roles) {
          let newMap = topModule.roles.forEach(role => {
            map[role.value] = role.label;
          });
        }
        else {
          map[topModule.value] = topModule.title;
        }

        return map;
      },
      {}
  );
}

export default class RolesTree extends React.Component {
  constructor(props) {
    super(props);
    let state = this.getStateFromProps(props);
    this.state = { ...state };
  }

  getStateFromProps(props) {
    let { value = [], datasource = [] } = props;
    let directMap = buildDirectMap(datasource);
    let mixedData = mixData(datasource, value);
    return { mixedData, directMap };
  }

  componentWillReceiveProps(nextProps) {
    let state = this.getStateFromProps(nextProps);
    this.setState({ ...state });
  }

  fireChange = () => {
    this.props.onChange && this.props.onChange(getValueFromMixedData(this.state.mixedData));
  }

  buildTopRolesCheck = (modules) => {
    return modules.map(({ key, name, children, isSelected, checkedRoles }) => {
      return (
          <div className="roles-tree-module-wrapper" key={key + '_module'}>
            <div className="roles-tree-module-title">
              <Checkbox
                  onChange={this.checkAllHandler(key)}
                  checked={children && children.length ? checkIsAll(children, checkedRoles) : isSelected}
                  indeterminate={children && children.length ? checkIsPartial(children, checkedRoles) : false}
                  key={key + '_module_all_roles'}
              >{name}</Checkbox>
            </div>
            {
              children && children.length ? <div className="roles-tree-module-content">
                <CheckboxGroup
                    options={children} value={checkedRoles}
                    onChange={this.changeHandler(key)} key={key + '_module_roles'} />
              </div> : null
            }
          </div>
      );
    });
  }


  buildTopRolesLabel = (modules) => {
    return modules.map(({ key, title, isSelected, roles, checkedRoles }) => {
      let isEmpty = roles ? (!checkIsAll(roles, checkedRoles) && !checkIsPartial(checkedRoles)) : !isSelected;

      let labels = roles ? checkedRoles.map(role => this.state.directMap[role]) : (isSelected ? [title] : []);
      return (
          isEmpty ? '' : <div className="roles-tree-module-wrapper" key={key + '_module'}>
            <div className="roles-tree-module-title">{title}</div>
            {labels.length ? <DetailField value={labels.join('、')} /> : ''}
          </div>
      );
    });
  }

  changeHandler = (key) => {
    return (checkedRoles) => {
      let mixedData = [...this.state.mixedData];
      let topModuleKey = getModuleIndexByKey(key, mixedData);
      mixedData[topModuleKey].checkedRoles = [...checkedRoles];
      this.setState({ mixedData }, this.fireChange);
    }
  }

  checkAllHandler = (key) => {
    return (e) => {
      let mixedData = [...this.state.mixedData];
      let topModuleKey = getModuleIndexByKey(key, mixedData);
      let { children = [] } = mixedData[topModuleKey];
      if (!children.length) {
        mixedData[topModuleKey].isSelected = e.target.checked;
      } else {
        let checkedRoles = [];
        if (e.target.checked) {
          checkedRoles = _.pluck(children, 'value');
        }
        mixedData[topModuleKey].checkedRoles = [...checkedRoles];
      }
      this.setState({ mixedData }, this.fireChange);
    }
  }

  render() {
    let { mixedData } = this.state;
    let { readonly } = this.props;

    return (
        <div className="roles-tree">
          {!readonly && this.buildTopRolesCheck(mixedData)}
          {readonly && this.buildTopRolesLabel(mixedData)}
        </div>
    );
  }
}

RolesTree.propTypes = {};
