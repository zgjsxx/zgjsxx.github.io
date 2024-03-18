import{_ as n,V as t,W as l,X as e,Y as a,$ as i,a0 as o,F as c}from"./framework-9a29aaa0.js";const s={},h=o('<h1 id="第二十三讲-内存管理" tabindex="-1"><a class="header-anchor" href="#第二十三讲-内存管理" aria-hidden="true">#</a> 第二十三讲：内存管理</h1><p>在我们的进程内部，地址空间从地址<code>0x400000</code> 开始，一直延伸到进程内存的最大地址（至少 2GB）。但是我们的计算机在物理上没有足够的内存让每个进程都拥有自己的2GB，并且显然它们在使用的内存中不能重叠，因此我们的进程所看到的内存逻辑视图和内存的物理布局。该转换部分由处理器处理，部分由操作系统处理。</p><p><strong>逻辑地址</strong>：进程地址空间内的地址。有时逻辑地址也称为虚拟地址。</p><p><strong>物理地址</strong>：计算机内存单元所见的地址，范围从 0 到可用 RAM 的数量。</p><p>内存管理的目标如下：</p><ul><li>允许每个进程有自己统一的地址空间</li><li>保护进程的内存免受彼此的影响：一个进程不应该能够访问另一进程的内存空间。</li><li>地址空间分配的灵活性，允许操作系统充分利用系统有限的内存。</li></ul><p>从<strong>逻辑地址</strong>到<strong>物理地址</strong>的映射是由称为内存管理单元或 MMU 的 CPU 组件完成的。由于几乎每次内存访问都需要转换，因此将 MMU 紧密集成到 CPU 中并且转换速度尽可能快非常重要。另一方面，MMU 必须是可编程的，因为操作系统需要控制如何将内存分配给进程。</p><h2 id="内存管理方案" tabindex="-1"><a class="header-anchor" href="#内存管理方案" aria-hidden="true">#</a> 内存管理方案</h2><ul><li>扁平内存：一次只能运行一个进程</li><li>重定位寄存器：多进程，无保护或共享</li><li>有限制的搬迁：多进程，更好的保护</li><li>分区</li><li>分页</li><li>多级分页</li><li>分段+分页</li></ul><h3 id="扁平内存方案" tabindex="-1"><a class="header-anchor" href="#扁平内存方案" aria-hidden="true">#</a> 扁平内存方案</h3><p>最简单的内存模型是平面方案：虚拟地址直接映射到物理地址，无需转换。这通常意味着一次只能运行一个进程。如果多个进程正在运行，那么它们每个都会获得一个单独的物理内存“片”（例如，一个进程的地址空间从 0x10000 开始，另一个进程从 0x110000 开始，等等），并且没有任何保护措施阻止一个进程访问另一个进程的内存。这种方法被早期的家用计算机使用：DOS、早期版本的 Mac OS 和 Windows 等。如今，它只适用于单一用途的系统：嵌入式系统和微控制器，其中没有操作系统，只有一个进程。</p><p>请注意，如果允许运行多个进程，则必须对它们进行编译，以便将每个进程加载到单独的内存区域中（或者必须将它们编译为“位置无关”，并且加载器必须负责将它们放置在不同的内存区域中）。</p><h2 id="x86-64-linux内存管理" tabindex="-1"><a class="header-anchor" href="#x86-64-linux内存管理" aria-hidden="true">#</a> x86-64 Linux内存管理</h2><h2 id="大页内存" tabindex="-1"><a class="header-anchor" href="#大页内存" aria-hidden="true">#</a> 大页内存</h2><p>x86-64 默认内存页面大小为 4KB，但可以使用大小为 2MB、4MB 和 1GB 的页面。</p><h2 id="附录" tabindex="-1"><a class="header-anchor" href="#附录" aria-hidden="true">#</a> 附录</h2>',16),d={href:"https://staffwww.fullcoll.edu/aclifton/cs241/lecture-memory-management.html",target:"_blank",rel:"noopener noreferrer"};function u(p,f){const r=c("ExternalLinkIcon");return t(),l("div",null,[h,e("p",null,[a("课程原文： "),e("a",d,[a("https://staffwww.fullcoll.edu/aclifton/cs241/lecture-memory-management.html"),i(r)])])])}const x=n(s,[["render",u],["__file","Lecture23-Memory-management.html.vue"]]);export{x as default};
