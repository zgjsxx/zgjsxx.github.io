import{_ as t,V as d,W as e,a0 as r}from"./framework-9a29aaa0.js";const a={},o=r('<ul><li><a href="#%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E6%9C%AC%E6%9E%B6%E6%9E%84-%E7%B3%BB%E7%BB%9F%E6%80%BB%E7%BA%BF">计算机基本架构-系统总线</a><ul><li><a href="#%E5%B9%B6%E8%A1%8C%E6%80%BB%E7%BA%BF%E6%9E%B6%E6%9E%84">并行总线架构</a></li><li><a href="#%E5%9F%BA%E6%9C%AC%E5%86%99%E4%BC%A0%E8%BE%93%E8%BF%87%E7%A8%8B">基本写传输过程</a></li><li><a href="#%E5%9F%BA%E6%9C%AC%E8%AF%BB%E4%BC%A0%E8%BE%93%E8%BF%87%E7%A8%8B">基本读传输过程</a></li><li><a href="#%E6%80%BB%E7%BA%BF%E4%B8%BB%E7%8A%B6%E6%80%81%E6%94%B9%E5%8F%98">总线主状态改变</a></li><li><a href="#%E6%80%BB%E7%BA%BF%E6%8F%A1%E6%89%8B">总线握手</a></li><li><a href="#%E6%80%BB%E7%BA%BF%E4%BB%B2%E8%A3%81">总线仲裁</a></li><li><a href="#%E4%B8%B2%E8%A1%8C%E6%8E%A5%E5%8F%A3">串行接口</a></li></ul></li></ul><h1 id="计算机基本架构-系统总线" tabindex="-1"><a class="header-anchor" href="#计算机基本架构-系统总线" aria-hidden="true">#</a> 计算机基本架构-系统总线</h1><p>系统总线负责维护中央处理器(CPU)、系统外设和内存之间的所有通信。系统总线按照一定的总线协议运行，以在总线主控设备和总线从属设备之间交换数据。总线协议确保在总线主控设备与总线从属设备交换数据时，将所有其他系统设备隔离开，以免干扰总线。总线主控设备发起数据传输，发送或接收来自从属设备或系统内存的数据。另一方面，总线从属设备没有启动数据传输的能力，只能响应总线主控设备以交换数据。</p><p>总线架构有两种类型，<strong>串行总线</strong>和<strong>并行总线</strong>。<strong>串行总线</strong>架构基本上由主控设备和从属设备之间的一根数据线组成，数据位一次一位地交换。相反， <strong>并行总线</strong>由多根数据线组成，可以同时发送或接收多个数据位。</p><p>在本章中，我们将描述几种串行和并行总线协议以及优先级方案。</p><h2 id="并行总线架构" tabindex="-1"><a class="header-anchor" href="#并行总线架构" aria-hidden="true">#</a> 并行总线架构</h2><p>典型系统中有两种并行总线架构：单向总线和双向总线。单向总线包含两条独立的数据路径：一条从总线主控设备开始到总线从属设备结束，另一条从总线从属设备开始到总线主控设备结束。而双向总线共享一条物理数据路径，允许数据在两个方向上流动。然而，这种类型的总线需要额外的逻辑开销和更复杂的控制。</p><p>下图描述了一种<strong>32位单向总线架构</strong>，包括两个总线主控设备和三个从属设备。在该图中，两条单向数据路径用较粗的线条突出显示。第一条路径是<strong>写路径</strong>，总线主控设备使用该路径将数据写入从属设备。此路径需要每个主控设备和从属设备都有一个写数据端口（<code>WData</code>）。第二条路径是<strong>读路径</strong>，用于从从属设备读取数据。这也需要每个主控设备和从属设备都有一个读数据端口（<code>RData</code>）。总线主控设备和从属设备都具有地址和控制端口，用于定义目标地址、数据传输方向、数据宽度和数据传输长度。</p><p>所有总线主控设备在开始数据传输之前必须与总线仲裁器协商以获得总线的所有权。当有多个总线主控设备的请求待处理时，仲裁器会根据某种优先级方案决定哪个总线主控设备应该优先开始数据传输，并向优先级最高的主控设备发出确认信号。因此，每个总线主控设备都有请求（Req）和确认（Ack）端口与仲裁器进行通信。一旦获得许可，主控设备会在第一个总线周期内向选定的从属设备发送地址和控制信号，并在下一个周期内写入或读取数据。连接到地址总线的解码器（DEC）会生成使能（EN）信号来激活选定的从属设备。每个主控设备和从属设备都有一个准备状态(ready)的端口，指示选定的从属设备是否准备好传输或接收数据。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/4/bus-structure-two-masters-three-slaves.png" alt="两主三从的总线结构的示例" tabindex="0" loading="lazy"><figcaption>两主三从的总线结构的示例</figcaption></figure><p><strong>32位双向总线架构</strong>如下图所示。为了便于比较，主设备和从设备的数量与上图保持一致。两图之间唯一的区别是，早期架构中的单向数据总线被双向总线所取代，用于读写数据。在双向总线架构中，数据线上的三态缓冲器是必不可少的，它们可以在数据传输仅在主设备和从设备之间进行时，隔离非必要的系统设备。图中的地址总线也可以与数据总线集成，以便在同一条总线上交换地址和数据。然而，这种方案速度较慢，并且需要额外的控制逻辑开销来维护正确的数据流和管理。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/4/bidirectional-bus-structure-with-two-bus-masters-and-three-slaves.png" alt="两主三从的双向总线结构的示例" tabindex="0" loading="lazy"><figcaption>两主三从的双向总线结构的示例</figcaption></figure><p>下面这张图展示了典型总线主设备的所有输入/输出（I/O）端口。正如前面提到的，<code>Req</code>和<code>Ack</code>端口用于与仲裁器进行通信。总线主设备使用<code>Ready</code>端口来确定从设备是否准备好传输或接收数据。<code>WData</code>、<code>RData</code>和<code>Address</code>端口分别用于写入数据、读取数据和指定从设备地址。控制信号<code>Status</code>、<code>Write</code>、<code>Size</code>和<code>Burst</code>描述了数据传输的性质。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/4/Bus-master-interface.png" alt="总线主设备接口" tabindex="0" loading="lazy"><figcaption>总线主设备接口</figcaption></figure><p><code>Status</code>端口是一个两位总线，如下表所示，用于描述总线主设备的状态。根据该表，总线主设备可以通过发出<code>START</code>信号来启动新的数据传输。如果主设备正在与从设备交换数据，则会发出<code>Continue</code> (CONT)信号。<code>IDLE</code>信号表示总线主设备已经完成了数据传输。一旦产生该信号，主设备会继续发出当前数据传输的最后一个地址和控制信号，直到总线上出现新的数据传输。总线主设备在与从设备交换数据的同时，也可能正在进行内部操作。对于这种特定情况，主设备可能会通过发出<code>BUSY</code>信号来暂时中止数据传输。</p><table><thead><tr><th><code>Status[1：0]</code></th><th>总线主设备的状态</th></tr></thead><tbody><tr><td>0 0</td><td>开始传输(START)</td></tr><tr><td>0 1</td><td>继续传输(CONT)</td></tr><tr><td>1 0</td><td>完成传输(IDLE)</td></tr><tr><td>1 1</td><td>停止传输(BUSY)</td></tr></tbody></table><p>Write端口，顾名思义，用于描述主设备是否正在进行数据写入或读取，如下表所示：</p><table><thead><tr><th><code>Write</code></th><th>总线主设备的操作</th></tr></thead><tbody><tr><td>0</td><td>读</td></tr><tr><td>1</td><td>写</td></tr></tbody></table><p><code>Size</code>端口描述了传输过程中数据的位宽，如下表所示。总线主设备可以以8位（字节）、16位（半字）、32位（字）或64位（双字）的形式传输或接收数据，位宽在传输过程中不可更改：</p><table><thead><tr><th><code>Size[1：0]</code></th><th>比特数</th></tr></thead><tbody><tr><td>0 0</td><td>8</td></tr><tr><td>0 1</td><td>16</td></tr><tr><td>1 0</td><td>32</td></tr><tr><td>1 1</td><td>64</td></tr></tbody></table><p><code>Burst</code>端口描述了总线主设备发送或接收的数据包数量，如下表所示。在该表中，总线主设备可以在一次突发传输中传输从一个数据包到超过32,000个数据包的数据。</p><table><thead><tr><th><code>Burst[3:0]</code></th><th>数据包数量</th></tr></thead><tbody><tr><td>0 0 0 0</td><td>1</td></tr><tr><td>0 0 0 1</td><td>2</td></tr><tr><td>0 0 1 0</td><td>4</td></tr><tr><td>0 0 1 1</td><td>8</td></tr><tr><td>0 1 0 0</td><td>16</td></tr><tr><td>0 1 0 1</td><td>32</td></tr><tr><td>0 1 1 0</td><td>64</td></tr><tr><td>0 1 1 1</td><td>128</td></tr><tr><td>1 0 0 0</td><td>256</td></tr><tr><td>1 0 0 1</td><td>512</td></tr><tr><td>1 0 1 0</td><td>1024</td></tr><tr><td>1 0 1 1</td><td>2048</td></tr><tr><td>1 1 0 0</td><td>4096</td></tr><tr><td>1 1 0 1</td><td>8196</td></tr><tr><td>1 1 1 0</td><td>16384</td></tr><tr><td>1 1 1 1</td><td>32768</td></tr></tbody></table><h2 id="基本写传输过程" tabindex="-1"><a class="header-anchor" href="#基本写传输过程" aria-hidden="true">#</a> 基本写传输过程</h2><p>这一节中，我们将使用时序图作为标准工具，展示主设备与从设备之间的总线活动。写操作的总线协议描述了总线主控设备如何使用单向总线将数据写入从属设备，具体过程由图中的时序图展示。</p><p>贴图</p><p>在第一个时钟周期，总线主控设备向从属设备发送目标地址和控制信号，<code>A1</code>和<code>C1</code>，而不管从属设备的状态如何。如果从属设备的状态是准备好（Ready），实际数据包<code>WData1</code>将在第二个周期与下一个数据包的地址和控制信号<code>A2</code>和<code>C2</code>一起发送。如果从属设备准备好，它应能在第三个时钟周期的上升沿读取<code>WData1</code>。然而，有时从属设备可能未准备好接收或发送数据。比如，在下图的第二个周期，从属设备的状态变为未准备好（Not Ready）。在第三个时钟周期的上升沿检测到从属设备的状态后，主控设备暂停写传输。这意味着当前的数据包<code>WData2</code>及下一个地址和控制信号A3和C3将被重复发送，直到从属设备的状态变为准备好为止。当从属设备准备好接收剩余数据时，正常的数据传输将继续。</p><h2 id="基本读传输过程" tabindex="-1"><a class="header-anchor" href="#基本读传输过程" aria-hidden="true">#</a> 基本读传输过程</h2><h2 id="总线主状态改变" tabindex="-1"><a class="header-anchor" href="#总线主状态改变" aria-hidden="true">#</a> 总线主状态改变</h2><h2 id="总线握手" tabindex="-1"><a class="header-anchor" href="#总线握手" aria-hidden="true">#</a> 总线握手</h2><h2 id="总线仲裁" tabindex="-1"><a class="header-anchor" href="#总线仲裁" aria-hidden="true">#</a> 总线仲裁</h2><h2 id="串行接口" tabindex="-1"><a class="header-anchor" href="#串行接口" aria-hidden="true">#</a> 串行接口</h2>',31),c=[o];function i(s,h){return d(),e("div",null,c)}const E=t(a,[["render",i],["__file","4-system-bus.html.vue"]]);export{E as default};
