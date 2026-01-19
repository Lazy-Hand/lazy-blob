---
name: openspec
description: 规范驱动开发 (Spec-driven Development) - 在编写代码前先定义规范，让 AI 根据规范进行开发
---

# OpenSpec 规范驱动开发 Skill

> 基于 [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec) 移植到
> Cursor

## 触发条件

当用户需要以下功能时自动激活此 skill：

- 创建新功能/特性的规范提案
- 需要在编码前进行需求分析和规范定义
- 管理项目变更和迭代
- 使用 `/openspec:` 相关命令

---

## 核心理念

> **在写代码之前，先与用户达成一致的行为规范**

没有规范时，AI 编码助手会根据模糊的提示生成代码，经常：

- ❌ 遗漏需求
- ❌ 添加不需要的功能
- ❌ 理解偏差

OpenSpec 通过**先定义规范，再写代码**，让 AI 开发变得可预测。

---

## 目录结构

```
openspec/
├── specs/                    # 当前规范（单一事实来源）
│   └── <domain>/
│       └── spec.md
├── changes/                  # 变更提案（待实施）
│   └── <change-name>/
│       ├── proposal.md       # 变更原因和内容说明
│       ├── tasks.md          # 实施任务清单
│       ├── design.md         # 技术设计（可选）
│       └── specs/
│           └── <domain>/
│               └── spec.md   # 规范增量 (Delta)
└── archive/                  # 已完成的变更归档
```

---

## 工作流程

### 1️⃣ 创建变更提案 (Propose)

**触发**: 用户描述一个新功能需求

**AI 行为**:

1. 在 `openspec/changes/<change-name>/` 创建完整结构
2. 生成 `proposal.md` - 说明变更原因和内容
3. 生成 `tasks.md` - 分解实施任务
4. 生成 `specs/<domain>/spec.md` - 规范增量

**示例**:

```
用户: 我想添加用户登录功能

AI 创建:
openspec/changes/add-user-login/
├── proposal.md
├── tasks.md
└── specs/
    └── auth/
        └── spec.md
```

### 2️⃣ 验证和审查 (Review)

**AI 行为**:

- 展示 proposal.md 给用户确认
- 展示 spec.md 中的场景让用户验证
- 确保所有需求都被覆盖

### 3️⃣ 细化规范 (Refine)

**AI 行为**:

- 根据用户反馈更新规范文件
- 同步更新 tasks.md 中的任务列表
- 保持提案和规范的一致性

### 4️⃣ 实施变更 (Apply)

**AI 行为**:

- 按照 `tasks.md` 中的任务列表逐个实施
- 实施完成后标记任务为完成 `[x]`
- 生成符合规范的代码

### 5️⃣ 归档变更 (Archive)

**AI 行为**:

- 将变更增量合并到 `openspec/specs/` 主规范
- 将变更文件夹移动到 `openspec/archive/`
- 在归档文件中添加完成时间戳

---

## 文件格式规范

### proposal.md 模板

```markdown
# Proposal: <变更名称>

## Summary

<一句话概述变更内容>

## Motivation

<为什么需要这个变更>

## Scope

### In Scope

- <包含的内容1>
- <包含的内容2>

### Out of Scope

- <不包含的内容>

## Approach

<实施方案概述>

## Dependencies

- <依赖项1>
- <依赖项2>

## Risks

- <风险1>
- <风险2>
```

### spec.md 模板

```markdown
# <Domain> Specification

## Purpose

<简要说明此规范的目的>

## Requirements

### Requirement: <需求名称>

The system SHALL/MUST <具体要求>.

#### Scenario: <场景名称>

- GIVEN <前置条件>
- WHEN <触发动作>
- THEN <预期结果>

#### Scenario: <另一场景>

- WHEN <触发动作>
- THEN <预期结果>
```

### Delta (规范增量) 格式

```markdown
# Delta for <Domain>

## ADDED Requirements

### Requirement: <新需求名称>

The system MUST <新增的能力>.

#### Scenario: <场景名称>

- WHEN <条件>
- THEN <结果>

## MODIFIED Requirements

### Requirement: <修改的需求名称>

The system SHALL <更新后的完整需求文本>.

## REMOVED Requirements

### Requirement: <移除的需求名称>

<说明移除原因>
```

### tasks.md 模板

```markdown
# Tasks for <Change Name>

## 1. <任务组1>

- [ ] 1.1 <具体任务>
- [ ] 1.2 <具体任务>

## 2. <任务组2>

- [ ] 2.1 <具体任务>
- [ ] 2.2 <具体任务>
```

**任务状态标记**:

- `- [ ]` 待完成
- `- [x]` 已完成
- `- [-]` 已取消

---

## 规范关键词说明

| 关键词      | 含义                 |
| ----------- | -------------------- |
| `SHALL`     | 必须实现（核心需求） |
| `MUST`      | 必须实现（强制要求） |
| `SHOULD`    | 应该实现（推荐）     |
| `MAY`       | 可以实现（可选）     |
| `SHALL NOT` | 禁止实现             |

---

## 命令参考

| 命令                        | 说明               |
| --------------------------- | ------------------ |
| `/openspec:init`            | 初始化目录结构     |
| `/openspec:proposal <描述>` | 创建新的变更提案   |
| `/openspec:list`            | 列出所有活跃的变更 |
| `/openspec:show <name>`     | 显示变更详情       |
| `/openspec:apply <name>`    | 实施变更           |
| `/openspec:archive <name>`  | 归档已完成的变更   |

---

## 使用示例

### 示例: 完整工作流演示

**用户输入**:

```
/openspec:proposal 添加订单导出功能
```

**AI 创建文件结构**:

```
openspec/
└── changes/
    └── add-order-export/
        ├── proposal.md
        ├── tasks.md
        └── specs/
            └── order/
                └── spec.md
```

**proposal.md**:

```markdown
# Proposal: 订单导出功能

## Summary

为订单管理模块添加 Excel 导出功能。

## Motivation

- 用户需要导出订单数据进行离线分析
- 财务部门需要定期汇总订单数据

## Scope

### In Scope

- 导出当前查询结果到 Excel
- 支持导出选中行或全部数据

### Out of Scope

- PDF 导出
- 定时自动导出
```

**specs/order/spec.md**:

```markdown
# Delta for Order

## ADDED Requirements

### Requirement: Export Order Data

The system SHALL allow users to export order data to Excel format.

#### Scenario: Export current query results

- GIVEN the user has queried order list
- WHEN user clicks the "导出" button
- THEN system downloads an Excel file containing current query results

#### Scenario: Export with no data

- GIVEN the order list is empty
- WHEN user views the page
- THEN the "导出" button should be disabled

#### Scenario: Export in progress

- WHEN export is in progress
- THEN show loading indicator on export button
- AND prevent multiple export requests
```

**tasks.md**:

```markdown
# Tasks for 订单导出功能

## 1. API 接口

- [ ] 1.1 在 api/index.js 中添加导出接口

## 2. 前端实现

- [ ] 2.1 添加导出按钮
- [ ] 2.2 实现 handleExport 方法
- [ ] 2.3 添加 loading 状态
- [ ] 2.4 无数据时禁用按钮

## 3. 用户体验

- [ ] 3.1 导出成功/失败提示
```

---

**用户确认后**:

```
/openspec:apply add-order-export
```

**AI 按任务执行，完成后更新 tasks.md**:

```markdown
## 1. API 接口

- [x] 1.1 在 api/index.js 中添加导出接口

## 2. 前端实现

- [x] 2.1 添加导出按钮
- [x] 2.2 实现 handleExport 方法 ...
```

---

**全部完成后**:

```
/openspec:archive add-order-export
```

**AI 行为**:

1. 将 `specs/order/spec.md` 合并到 `openspec/specs/order/spec.md`
2. 将变更文件夹移动到 `openspec/archive/add-order-export/`
3. 添加完成时间戳

---

## 与其他 Skill 配合

| Skill                | 配合方式                                       |
| -------------------- | ---------------------------------------------- |
| `superpowers`        | Superpowers 的设计文档可以存储为 OpenSpec 规范 |
| `vue-page-generator` | 在 OpenSpec 规范确认后，使用此 skill 生成页面  |

---

## 最佳实践

1. **先规范后编码** - 始终在编写代码前完成规范定义
2. **场景驱动** - 每个需求至少包含一个场景
3. **增量迭代** - 使用 Delta 格式追踪变更
4. **任务分解** - 将大任务分解为 2-5 分钟可完成的小任务
5. **及时归档** - 完成后立即归档，保持 changes 目录整洁

---

## 初始化命令

当用户使用 `/openspec:init` 时，创建以下目录结构：

```
openspec/
├── specs/
│   └── .gitkeep
├── changes/
│   └── .gitkeep
└── archive/
    └── .gitkeep
```

---

## 参考链接

- [OpenSpec 官方仓库](https://github.com/Fission-AI/OpenSpec)
- [OpenSpec 官网](https://openspec.dev/)