<template>
  <el-dialog
    :title="options.formAction == 0 ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="options.visible"
    width="40%"
  >
    <el-tabs v-model="options.tabActive" @tab-click="handleTabClick">
      <el-tab-pane label="基本信息" name="baseInfo">
        <t-form
          :model="model"
          ref="ruleForm"
          label-width="100px"
          v-show="options.tabActive == 'baseInfo'"
        >
          <el-form-item
            label="名称"
            prop="name"
            verify
            :maxLength="32"
            class="is-required"
          >
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item
            label="类型"
            prop="roleCategoryId"
            verify
            class="is-required"
          >
            <t-dic-dropdown-select
              dicType="base_rolecategory"
              v-model="model.roleCategoryId"
              @change="onRoleCategoryIdChanged"
            ></t-dic-dropdown-select>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item
                label="所属组织"
                prop="organizationId"
                verify
                class="is-required"
                :maxLength="50"
              >
                <t-cascader
                  v-model="model.organizationId"
                  :options="organizationIdOptions"
                ></t-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            label="备注"
            prop="remark"
            verify
            can-be-empty
            :maxLength="200"
          >
            <el-input type="textarea" v-model="model.remark"></el-input>
          </el-form-item>
        </t-form>
      </el-tab-pane>
      <el-tab-pane label="功能权限" name="permission">
        <t-tree
          ref="permissionTree"
          :options="permissionTreeOptons"
          v-show="options.tabActive == 'permission'"
          @check="onPermissionTreeCheck"
        >
        </t-tree>
      </el-tab-pane>
      <el-tab-pane label="数据权限" name="datapermission">
        <t-tree
          ref="dataPermissionTree"
          :options="dataPermissionTreeOptons"
          v-show="options.tabActive == 'datapermission'"
        >
        </t-tree>
      </el-tab-pane>
      <el-tab-pane label="所属用户" name="roleOfUser">
        <t-grid ref="roleOfUsersList" :options="roleOfUsersGridOptions">
        </t-grid>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()"
        >确定</el-button
      >
      <el-button @click="doClose()">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import baseComponent from "@/base/baseComponent";
const defaultModel = {
        id: null,
        gmtVersion: -1,
        organizationId: null,
        name: null,
        remark: null,
        type: null,
        roleCategoryId: null,
        permissionIds: [],
        dataPermissionIds: []
};
export default {
  extends: baseComponent,
  data() {
    return {
      options: {
        formAction: 0, //0 add,//1,edit
        visible: false,
        tabActive: "baseInfo"
      },
      model:{...defaultModel},
      permissionTreeOptons: {
        dataSource: {
          serviceInstance: tapp.services.base_Permission.getPermissions,
          serviceInstanceInputParameters: {}
        },
        tree: {
          checkStrictly: true,
          defaultCheckedKeys: [],
          renderContent: this.renderPermissionTreeNodeContent
        }
      },
      dataPermissionTreeOptons: {
        dataSource: {
          serviceInstance: tapp.services.base_Organization.getTreeOrganizations,
          serviceInstanceInputParameters: {}
        },
        tree: {
          checkStrictly: true,
          defaultCheckedKeys: [],
          renderContent: this.renderDataPermissionTreeNodeContent
        }
      },
      roleOfUsersGridOptions: {
        dataSource: {
          autoLoadData: false,
          serviceInstance: tapp.services.base_Role.getRoleUserList,
          serviceInstanceInputParameters: null
        },
        grid: {
          mutiSelect: false,
          pageable: false,
          columns: [
            {
              prop: "loginId",
              label: "登陆名",
              sortable: true,
              width: 120
            },
            {
              prop: "name",
              label: "姓名",
              sortable: true,
              width: 120
            },
            {
              prop: "email",
              label: "邮箱",
              sortable: true,
              width: 280
            }
          ], // 需要展示的列
          defaultSort: {
            prop: "loginId",
            order: "ascending"
          }
        }
      },
      organizationIdOptions: {
        dataSource: {
          serviceInstance: tapp.services.base_Organization.getTreeOrganizations,
          serviceInstanceInputParameters: {}
        }
      }
    };
  },
  created() {},
  activated() {},
  methods: {
    init(orgId, id) {
      this.model = {...defaultModel};
      this.options.tabActive = "baseInfo";
      this.options.visible = true;

      if (id) {
        let self = this;
        tapp.services.base_Role
          .findOneWithPermissionIds(id)
          .then(function(result) {
            self.$refs.ruleForm.clearValidate();
            self.model = self.$util.deepObjectAssign({}, self.model, result);
            if (!result.permissionIds.includes("common")) {
              result.permissionIds.push("common");
            }
            self.$refs.permissionTree.setCheckedKeys(result.permissionIds);
            self.$refs.dataPermissionTree.setCheckedKeys(
              result.dataPermissionIds
            );
            self.roleOfUsersGridOptions.dataSource.serviceInstanceInputParameters = id;
            self.$refs.roleOfUsersList.refresh();
            self.options.formAction = 1;
          });
      } else {
        this.model = {
          organizationId: orgId,
          name: ""
        };
        this.$nextTick(() => {
          this.$refs.ruleForm.clearValidate();
          this.$refs.permissionTree.setCheckedKeys(["common"]);
          this.$refs.dataPermissionTree.setCheckedKeys([]);
          this.roleOfUsersGridOptions.dataSource.serviceInstanceInputParameters = null;
          this.$refs.roleOfUsersList.clear();
          this.options.formAction = 0;
        });
      }
    },
    handleTabClick(tab, event) {
      if (!tab) {
        return;
      }
      this.options.tabActive = tab.name;
    },
    onRoleCategoryIdChanged(val) {
      if (!this.model.name) {
        this.model.name = val && val.name;
      }
    },
    renderPermissionTreeNodeContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            {node.isLeaf ? (
              ""
            ) : (
              <el-button
                size="mini"
                type="text"
                on-click={() => this.checkPermissionTreeChildren(data, node)}
              >
                选中子项
              </el-button>
            )}
          </span>
        </span>
      );
    },
    renderDataPermissionTreeNodeContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            {node.isLeaf ? (
              ""
            ) : (
              <el-button
                size="mini"
                type="text"
                on-click={() =>
                  this.checkDataPermissionTreeChildren(data, node)
                }
              >
                选中子项
              </el-button>
            )}
          </span>
        </span>
      );
    },
    onPermissionTreeCheck(data, tree) {
      this.$refs.permissionTree.checkParentDeep(data);
    },
    checkPermissionTreeChildren(data, node) {
      this.$refs.permissionTree.checkChildrenDeep(data, true);
    },
    checkDataPermissionTreeChildren(data, node) {
      this.$refs.dataPermissionTree.checkChildrenDeep(data, true);
    },
    dataFormSubmit() {
      let self = this;
      self.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let model = self.model;
          model.permissionIds = self.$refs.permissionTree.getCheckedKeys();
          model.dataPermissionIds = self.$refs.dataPermissionTree.getCheckedKeys();
          tapp.services.base_Role.save(model).then(function(result) {
            self.model = self.$util.deepObjectAssign({}, self.model, result);
            self.formAction = 1;
            self.$notify.success({
              title: "操作成功",
              message: "岗位已保存成功！",
              duration: 1500,
              onClose: () => {}
            });
          });
        } else {
          self.$notify.error({
            title: "错误",
            message: "系统输入验证失败！"
          });
          return false;
        }
      });
    },
    doClose() {
      this.options.visible = false;
      this.$emit("change");
    },
    doDelete() {
      let self = this;
      self
        .$confirm("此操作将永久删除岗位, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          tapp.services.base_Role.delete(self.model.id).then(function(result) {
            self.formAction = 0;
            self.$notify.success({
              title: "系统删除成功",
              duration: 1500,
              message: "用户信息已删除成功！",
              onClose: () => {
                self.options.visible = false;
                self.$emit("change");
              }
            });
          });
        });
    }
  }
};
</script>
