import{_ as e,V as t,W as a,a0 as r}from"./framework-9a29aaa0.js";const n={},o=r('<h1 id="操作系统1" tabindex="-1"><a class="header-anchor" href="#操作系统1" aria-hidden="true">#</a> 操作系统1</h1><h2 id="构建操作系统的基础知识" tabindex="-1"><a class="header-anchor" href="#构建操作系统的基础知识" aria-hidden="true">#</a> 构建操作系统的基础知识</h2><p>我们将在课程的最后两周里希望能够在原始虚拟机上启动我们自己的&quot;操作系统&quot;。我们将使用 QEMU 作为虚拟机（它安装在服务器上，如果我们需要调试代码，它可以与 GDB 通信）。</p><p><strong>开机流程</strong></p><p>系统“启动”有两个过程（即，将控制从系统芯片上的硬编码功能转移到某些存储介质上定义的代码），这两个过程都涉及在存储设备上运行某些代码（硬编码功能）。驱动器、闪存驱动器、DVD 等）：</p><ul><li>MBR：传统方式，引导存储设备的前 512 字节专用于主引导记录，其中应包含用于查找和运行操作系统其余部分的代码。该系统非常有限：每个驱动器只能有四个分区，并且引导记录的 512 字节大小限制意味着引导代码必须尽可能简单。另一方面，因为系统实际上只是直接从磁盘加载一些代码并开始运行它，所以这对我们来说是最容易编写的。</li></ul><p>（MBR 有时也用作磁盘格式化方案的名称，因为两者无法区分。）</p><ul><li>EFI：更新、更灵活的方法，在磁盘上创建一个特殊分区来包含有关磁盘的所有其他“可引导”部分的信息。默认选择其中之一，启动它的代码驻留在 EFI 分区中。这使得管理启动过程对于最终用户来说更加简单和灵活，但对于我们来说却更加复杂。 EFI 还要求使用不同的方案（GPT）对磁盘进行格式化。</li></ul><p>另一方面，虽然 MBR 引导加载程序可以通过 BIOS 访问一小部分、定义不明确的功能，但 EFI 已标准化，可以提供更多有关系统及其资源的信息。现代操作系统（在 EFI 之后编写的操作系统）可以利用这一点来查询系统已安装的硬件，并在操作系统内核本身开始启动之前进行配置，从而简化内核设计。</p><p>我们将坚持使用 MBR，因为这对我们来说更容易。</p><p><strong>MBR</strong></p><p>MBR 格式的磁盘的前 512 字节专用于主引导记录。 MBR 包含分区表（定义如何将磁盘划分为最多四个分区）以及引导代码（在系统启动时执行）。反过来，如果每个分区被标记为可引导，则可以有自己的引导记录，其中包含自己的引导代码。 MBR 的典型行为只是找到第一个可启动分区，然后加载并运行其启动代码，但它也可以做更奇特的事情，例如显示可启动分区的菜单等。</p>',12),c=[o];function s(p,i){return t(),a("div",null,c)}const d=e(n,[["render",s],["__file","Lecture24-OS-part1.html.vue"]]);export{d as default};