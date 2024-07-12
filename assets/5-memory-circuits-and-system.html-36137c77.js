import{_ as t,V as l,W as n,a0 as a,X as e,Y as s}from"./framework-9a29aaa0.js";const o={},c=a('<ul><li><a href="#%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E6%9C%AC%E6%9E%B6%E6%9E%84-%E5%86%85%E5%AD%98">计算机基本架构-内存</a><ul><li><a href="#1%E9%9D%99%E6%80%81%E9%9A%8F%E6%9C%BA%E5%AD%98%E5%8F%96%E5%AD%98%E5%82%A8%E5%99%A8-sram">1.静态随机存取存储器 (SRAM)</a></li><li><a href="#2%E5%90%8C%E6%AD%A5%E5%8A%A8%E6%80%81%E9%9A%8F%E6%9C%BA%E5%AD%98%E5%8F%96%E5%AD%98%E5%82%A8%E5%99%A8sdram">2.同步动态随机存取存储器（SDRAM）</a></li><li><a href="#3%E7%94%B5%E5%8F%AF%E6%93%A6%E9%99%A4%E5%8F%AF%E7%BC%96%E7%A8%8B%E5%8F%AA%E8%AF%BB%E5%AD%98%E5%82%A8%E5%99%A8eeprom">3.电可擦除可编程只读存储器(EEPROM)</a></li><li><a href="#4flash-memory">4.Flash memory</a></li><li><a href="#5serial-flash-memory">5.Serial Flash Memory</a></li><li><a href="#%E9%99%84">附</a></li><li><a href="#refernce">refernce</a></li></ul></li></ul><h1 id="计算机基本架构-内存" tabindex="-1"><a class="header-anchor" href="#计算机基本架构-内存" aria-hidden="true">#</a> 计算机基本架构-内存</h1><p>先前的章节解释了基本的串行和并行总线结构，以及总线主控器和从设备之间不同形式的数据传输。无论总线架构如何，总线主控器被定义为发起数据传输的逻辑块，而从设备被定义为只能在主控器要求下监听和交换数据的设备。然而，这两个设备都包含某种形式的存储器。在从设备的情况下，这可以是系统存储器或属于外设设备的缓冲存储器。</p><p>根据读取和写入速度、容量和数据的持久性，系统存储器和外设缓冲区可以分为三种不同的形式。如果需要快速的读写时间，则使用静态随机存取存储器 (<code>SRAM</code>)，尽管与其他类型的存储器相比，其单元尺寸相对较大。<code>SRAM</code> 通常用于存储小的临时数据，并且通常连接到系统中的高速并行总线。如果需要大量存储，但可以容忍较慢的读写速度，那么动态随机存取存储器 (<code>DRAM</code>) 应该是主要使用的存储类型。<code>DRAM</code> 仍然连接到高速并行总线，通常以接收或传送数据突发的方式运行。典型的 <code>DRAM</code> 单元比 <code>SRAM</code> 单元小得多，功耗也显著降低。<code>DRAM</code> 的主要缺点是高数据读写延迟、存储控制和数据管理的复杂性。</p>',4),i=e("p",null,[s("数据的永久性存储需要第三种存储器类型，其单元类型由双栅金属氧化物半导体（MOS）晶体管组成。数据被永久性地存储在该设备的浮动栅中，直到被新数据覆写。电可擦可编程只读存储器（"),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("msup",null,[e("mi",null,"E"),e("mn",null,"2")]),e("mi",null,"P"),e("mi",null,"R"),e("mi",null,"O"),e("mi",null,"M")]),e("annotation",{encoding:"application/x-tex"},"{E}^{2}PROM")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.8141em"}}),e("span",{class:"mord"},[e("span",{class:"mord"},[e("span",{class:"mord mathnormal",style:{"margin-right":"0.05764em"}},"E")]),e("span",{class:"msupsub"},[e("span",{class:"vlist-t"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.8141em"}},[e("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[e("span",{class:"pstrut",style:{height:"2.7em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mtight"},[e("span",{class:"mord mtight"},"2")])])])])])])])]),e("span",{class:"mord mathnormal",style:{"margin-right":"0.10903em"}},"PROM")])])]),s("）或闪存记忆体属于这种类型的设备。这种存储器类型的优点是，即使系统断电，它仍然保留存储的数据。然而，与所有其他存储器类型相比，这种存储器速度最慢，并且受到有限的读写周期限制。因此，它的最佳用途是用于存储内建操作系统（"),e("code",null,"BIOS"),s("）的永久数据，特别是在功耗关键的手持设备中。典型的计算系统可以根据使用和应用软件的需要包含一种或全部三种类型的存储器。")],-1),r=a('<p>本章中描述的<code>SDRAM</code>、<code>EEPROM</code>和<code>Flash</code>存储器的基本功能灵感来源于东芝存储器数据表[1-6]。较新的带SPI接口的串行Flash存储器则基于Atmel Flash存储器的数据表[7]。在每种情况下，存储块的功能相较于原始数据表已经被大幅简化（并修改），以提高读者对相关主题的理解。这里的目的是展示每种存储器类型在系统中的操作方式，仅涵盖基本的操作模式，以便训练读者，而不是详细探讨实际数据表的内容。每种存储器的地址、数据和控制时序限制也较数据表进行了简化。这使我们能够轻松地为每种存储器类型设计总线接口。为了简化起见，我们避免了重复端口名称、确切的时序要求和功能细节，这些都可以在实际数据表中找到。读完本章后，建议有兴趣的读者在进行设计任务之前先研究参考数据表。</p><h2 id="_1-静态随机存取存储器-sram" tabindex="-1"><a class="header-anchor" href="#_1-静态随机存取存储器-sram" aria-hidden="true">#</a> 1.静态随机存取存储器 (SRAM)</h2><p>静态随机存取存储器（<code>SRAM</code>）是数字设计中最基础的存储块之一。在各种类型的存储器中，<code>SRAM</code>速度最快。然而，其较大的存储单元尺寸限制了它在多种应用中的使用。</p>',3),m=e("p",null,[s("如图下图所示，典型的"),e("code",null,"SRAM"),s("架构由四个不同的模块组成："),e("strong",null,"SRAM核心"),s("、"),e("strong",null,"地址译码器"),s("、"),e("strong",null,"感应放大器"),s("和"),e("strong",null,"内部SRAM控制器"),s("。存储核心保持即时数据。感应放大器在读取过程中将单元电压放大到完整的逻辑电平。地址译码器根据N位地址生成"),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("msup",null,[e("mn",null,"2"),e("mi",null,"N")])]),e("annotation",{encoding:"application/x-tex"},"{2}^{N}")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.8413em"}}),e("span",{class:"mord"},[e("span",{class:"mord"},[e("span",{class:"mord"},"2")]),e("span",{class:"msupsub"},[e("span",{class:"vlist-t"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.8413em"}},[e("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[e("span",{class:"pstrut",style:{height:"2.7em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mtight"},[e("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.10903em"}},"N")])])])])])])])])])])]),s("个字线（Word Lines）。最后，控制器生成在读取或写入周期中所需的自时序脉冲。")],-1),d=a('<figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/5/fig-1-SRAM-arhi-with-eight-bit-address-32-bit-data.png" alt="一个典型的有8比特地址和32比特数据位的SRAM架构" tabindex="0" loading="lazy"><figcaption>一个典型的有8比特地址和32比特数据位的SRAM架构</figcaption></figure><p>每个<code>SRAM</code>单元由两个背对背的反相器组成，就像锁存器中使用的那样，并且有两个N沟道金属氧化物半导体（NMOS）传输门晶体管来隔离单元中的现有数据或允许新数据进入单元，如下图所示。当需要将数据写入单元时，<code>WL = 1</code>会打开两个NMOS晶体管，允许来自Bit和Bitbar输入端的真实数据和互补数据同时写入单元。如果我们假设节点A初始为逻辑0，节点B为逻辑1，且WL = 0，那么WL的逻辑电平会关闭两个NMOS晶体管，锁存器将完全与其周围环境隔离。结果是逻辑0电平被保持在单元中。但是，如果<code>WL = 1</code>，Bit节点为1，Bitbar节点为0，那么WL的逻辑电平会打开两个NMOS晶体管，允许Bit和Bitbar上的值覆盖节点A和B上现有的逻辑电平，从而将单元中存储的位从逻辑0更改为逻辑1。</p><p>同样地，如果需要从单元中读取数据，可以通过设置<code>WL=1</code>来打开两个NMOS晶体管，然后在Bit和Bitbar输出之间产生的小差分电位会被感应放大器放大，最终在SRAM输出端达到完整的逻辑电平。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/5/fig-2-SRAM-memory-cell.png" alt="SRAM内存单元" tabindex="0" loading="lazy"><figcaption>SRAM内存单元</figcaption></figure><p>数据写入序列以<code>EN= 1</code>和<code>WE = 1</code>开始。这种组合将SRAM核心中的<code>Bit</code>和<code>Bitbar</code>节点预充到预设电压值，并为写入做准备。当预充周期完成后，控制器通过设置<code>EnWL = 1</code>来启用地址解码器，如下图所示。解码器根据<code>AddrIn[7:0]</code>提供的值激活256个<code>WL</code>中的一个。在同一时间段内，控制器还生成<code>WritePulse = 1</code>，允许有效数据<code>DIn[31:0]</code>写入指定地址。</p><p>从SRAM核心读取数据通过设置<code>EN = 1</code>和<code>WE = 0</code>来执行。与写入操作类似，控制器在读取数据之前首先对SRAM核心进行预充，然后启用地址解码器。根据<code>AddrIn</code>端口的地址值，特定行的<code>WL</code>输入被激活，数据从指定行的每个单元被读取到相应的Bit和Bitbar节点。感应放大器将单元电压放大到全逻辑电平，并将数据传送到<code>DOut</code>端口。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/5/fig-3-SRAM-IO-timing-for-write.png" alt="SRAM写操作时序图" tabindex="0" loading="lazy"><figcaption>SRAM写操作时序图</figcaption></figure><p>将SRAM模块集成到现有系统中的一个重要任务是设计其总线接口。下图显示了这种实现的框图。总线接口基本上将所有总线控制信号转换为SRAM控制信号（反之亦然），但很少对地址或数据进行修改。在第4章描述的单向总线协议中，SRAM被视为总线从设备，它根据<code>Ready</code>信号与总线主设备交换数据。同样如<strong>系统总线章节</strong>中所述，总线主设备有四个控制信号来配置数据传输。<code>Status</code>信号指示总线主设备是发送第一个数据包（START）还是正在发送剩余的数据包（<code>CONT</code>）。总线主设备还可能发送<code>IDLE</code>或<code>BUSY</code>信号，分别指示其已完成当前数据传输或正忙于内部任务。<code>Write</code>信号指定总线主设备是打算向从设备写入数据还是从从设备读取数据。<code>Burst</code>信号指定事务中的数据包数量，而<code>Size</code>信号定义数据的宽度。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/5/sram-bus-interface.png" alt="图5-5：SRAM总线接口" tabindex="0" loading="lazy"><figcaption>图5-5：SRAM总线接口</figcaption></figure><p>下图中的时序图展示了如何将四个数据包W1至W4写入四个连续的SRAM地址A1至A4。要启动写入序列，总线主设备在第一个时钟周期内发出一个有效地址，并设定<code>Status = START</code>和<code>Write = 1</code>，同时通过产生一个有效高的总线接口写入使能信号（<code>BIWEn</code>, Bus Interface Write Enable）来启用总线接口进行写入。在接收到<code>BIWEn = 1</code>后，总线接口在下一个周期内产生<code>Ready = 1</code>，并提示总线主设备在第三个周期内更改地址和控制信号。当总线主设备将地址从<code>A1</code>更改为<code>A2</code>时，它也根据第4章中解释的单向总线协议发送第一个数据包<code>W1</code>。然而，为了写入SRAM地址，有效数据必须与有效地址在同一个周期内可用，如图5-3所示。因此，在图5-5中，SRAM的Addr端口上添加了一组八个触发器，使地址A1延迟一个时钟周期，并与当前数据W1对齐。总线接口还在第三个周期内产生<code>EN = WE = 1</code>，以便在第四个时钟周期的正沿将<code>W1</code>写入<code>A1</code>。接下来的写入以相同的方式完成：SRAM地址延迟一个周期，以便在第五个周期的正沿将W2写入地址A2。在第六个周期，总线接口降低<code>Ready</code>信号，以使总线主设备停止递增从设备地址。然而，它保持<code>EN = WE = 1</code>，以便能够将<code>W4</code>写入<code>A4</code>。</p><p>贴图</p><p>为了启动读取序列，总线主设备在图5-8的第一个时钟周期内发出一个有效的SRAM地址，并设定<code>Status = START</code>和<code>Write = 0</code>信号。这种组合产生一个有效高的总线接口读使能信号，即<code>BIREn = 1</code>，这被解释为总线主设备打算从SRAM地址读取数据。因此，总线接口在第二个周期内产生<code>EN = 1</code>，<code>WE = 0</code>，<code>Ready = 1</code>。这在第三个周期从SRAM地址B1获取第一个数据R1。第四和第五周期内的读事务与第三周期相同，总线主设备分别从地址B2和B3读取数据R2和R3。在第六个周期，总线接口保持Ready = 1，以便总线主设备仍能够从地址B4读取最后一个数据R4。</p><p>贴图</p><p>增加SRAM容量需要使用额外的地址位。在图5-10所示的示例中，通过添加两个额外的地址位<code>Addr[5:4]</code>，SRAM容量从<code>32 x 16</code>位增加到<code>32 x 64</code>位，这些地址位用于访问四个SRAM块中的一个。在这个图中，即使<code>Addr[3:0]</code>指向所有四个32 x 16 SRAM块的相同地址位置，<code>Addr[5:4]</code>结合EN信号只启用四个块中的一个。此外，从所选块读取的数据通过<code>Addr[5:4]</code>输入路由到4-1多路复用器。<code>Addr[5:4] = 00</code>选择<code>DOut0</code>端口的内容，并通过4-1多路复用器的端口0将数据路由到Out[31:0]。同样，<code>Addr[5:4]</code> = 01、10和11分别选择4-1多路复用器的端口1、2和3，并将<code>DOut1</code>、<code>DOut2</code>和<code>DOut3</code>端口的数据分别路由到<code>Out[31:0]</code>。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/5/5-10-increasing-SRAM-address-space.png" alt="图5-10：SRAM总线接口" tabindex="0" loading="lazy"><figcaption>图5-10：SRAM总线接口</figcaption></figure><h2 id="_2-同步动态随机存取存储器-sdram" tabindex="-1"><a class="header-anchor" href="#_2-同步动态随机存取存储器-sdram" aria-hidden="true">#</a> 2.同步动态随机存取存储器（SDRAM）</h2><p><strong>同步动态随机存取内存</strong>(SDRAM) 是一种旧版 DRAM 的变种，它构成了几乎所有计算系统的主要内存。尽管它的容量可以比 SRAM 高出几个数量级，但它的速度却不如 SRAM。因此，SDRAM 主要用于在速度不重要的情况下存储大量数据块。</p><p>一个<code>SDRAM</code>模块由四个部分组成。存储核心是数据存储的地方。行和列解码器定位数据。感应放大器在读取过程中放大单元电压。控制器管理所有读写序列。</p><p>图5-11中的框图显示了一个典型的32位<code>SDRAM</code>架构，它由四个称为<code>bank</code>的存储核心组成，这些核心通过一个单向输入/输出端口访问。在操作内存之前，必须将主要的内部功能，如寻址模式、数据延迟和突发长度，存储在地址模式寄存器中。</p><p>贴图</p><p>编程完成后，如表5-1所示，低电平有效的行地址选通信号（<code>RAS</code>）、列地址选通信号（<code>CAS</code>）和写使能信号（<code>WE</code>）决定了内存的功能。选定银行的输入/输出端口上的数据可以在到达数据输入/输出端口（<code>DInOut</code>）之前在读/写逻辑块处被屏蔽。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/5/table5-1-SDRAM-modes-of-operation.png" alt="表5-1：SDRAM操作模式" tabindex="0" loading="lazy"><figcaption>表5-1：SDRAM操作模式</figcaption></figure><p><code>SDRAM</code>单元是一个简单的器件，由一个<code>NMOS</code>通道晶体管来控制数据的流入和流出，以及一个电容器来存储数据，如图5-12所示。当需要将新数据写入单元时，通过将控制信号设置为1来打开NMOS晶体管，使<code>DIn/Out</code>端子的数据显示覆盖单元节点上的旧数据。另一方面，读取单元中的数据则需要在打开通道晶体管之前激活感应放大器。当需要保存数据时，只需通过将控制信号设置为0来关闭<code>NMOS</code>晶体管。然而，单元电容器上的电荷会通过其绝缘体慢慢泄漏，导致单元电压降低。因此，在<code>SDRAM</code>操作过程中，需要自动或手动的单元刷新周期来保持单元中的位值。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/5/5-12-SDRAM-memory-cell.png" alt="图5-12：SDRAM 内存单元" tabindex="0" loading="lazy"><figcaption>图5-12：SDRAM 内存单元</figcaption></figure>',24),p=e("p",null,[s("表5-1的真值表的第一行说明了如何编程内部地址模式寄存器。在时钟的上升沿，"),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("mover",{accent:"true"},[e("mrow",null,[e("mi",null,"C"),e("mi",null,"S")]),e("mo",{stretchy:"true"},"‾")])]),e("annotation",{encoding:"application/x-tex"},"\\overline{CS}")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.8833em"}}),e("span",{class:"mord overline"},[e("span",{class:"vlist-t"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.8833em"}},[e("span",{style:{top:"-3em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal",style:{"margin-right":"0.05764em"}},"CS")])]),e("span",{style:{top:"-3.8033em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"overline-line",style:{"border-bottom-width":"0.04em"}})])])])])])])])]),s("、"),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("mover",{accent:"true"},[e("mrow",null,[e("mi",null,"R"),e("mi",null,"A"),e("mi",null,"S")]),e("mo",{stretchy:"true"},"‾")])]),e("annotation",{encoding:"application/x-tex"},"\\overline{RAS}")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.8833em"}}),e("span",{class:"mord overline"},[e("span",{class:"vlist-t"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.8833em"}},[e("span",{style:{top:"-3em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal",style:{"margin-right":"0.00773em"}},"R"),e("span",{class:"mord mathnormal"},"A"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.05764em"}},"S")])]),e("span",{style:{top:"-3.8033em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"overline-line",style:{"border-bottom-width":"0.04em"}})])])])])])])])]),s("、"),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("mover",{accent:"true"},[e("mrow",null,[e("mi",null,"C"),e("mi",null,"A"),e("mi",null,"S")]),e("mo",{stretchy:"true"},"‾")])]),e("annotation",{encoding:"application/x-tex"},"\\overline{CAS}")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.8833em"}}),e("span",{class:"mord overline"},[e("span",{class:"vlist-t"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.8833em"}},[e("span",{style:{top:"-3em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal",style:{"margin-right":"0.07153em"}},"C"),e("span",{class:"mord mathnormal"},"A"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.05764em"}},"S")])]),e("span",{style:{top:"-3.8033em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"overline-line",style:{"border-bottom-width":"0.04em"}})])])])])])])])]),s(" 和 "),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("mover",{accent:"true"},[e("mrow",null,[e("mi",null,"W"),e("mi",null,"E")]),e("mo",{stretchy:"true"},"‾")])]),e("annotation",{encoding:"application/x-tex"},"\\overline{WE}")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.8833em"}}),e("span",{class:"mord overline"},[e("span",{class:"vlist-t"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.8833em"}},[e("span",{style:{top:"-3em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"W"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.05764em"}},"E")])]),e("span",{style:{top:"-3.8033em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"overline-line",style:{"border-bottom-width":"0.04em"}})])])])])])])])]),s(" 信号被拉低至逻辑 0 以编程地址模式寄存器，如图 5-13 所示。在编程模式中，地址位 "),e("code",null,"A[2:0]"),s(" 定义了数据突发长度，如表 5-2 所示。突发长度可以从一个字到整页，整页等于整个存储库的内容。地址位 "),e("code",null,"A[3]"),s(" 定义了每个数据包的 SDRAM 地址如何递增。通过简单地将起始地址加 1 并根据突发长度的大小消除进位位，可以实现顺序寻址。")],-1),h=a('<p>贴图</p><p>例如，如果起始地址为 13 且突发长度为两个字，则会消除列 <code>A[0]</code> 的进位位，下一地址变为 12，如表 5-3 所示。同一表中，如果突发长度增加到四个字，则会消除列 <code>A[1]</code> 的进位位，起始地址 13 之后的地址值依次变为 <code>14、15、 12</code>。如果突发长度变为八个字，则会消除列 <code>A[2]</code> 的进位位，地址值依次为 <code>13、14、15、8、9、10、11 和 12</code>。顺序寻址将数据的读写限制在预定义的循环存储空间内，这对于某些特定的软件应用非常方便。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/5/table-5-3-SDRAM-sequential-mode-addressing-for-burst-length.png" alt="表5-3：SDRAM 序列模式对于突发长度是2，4，8时的地址变化" tabindex="0" loading="lazy"><figcaption>表5-3：SDRAM 序列模式对于突发长度是2，4，8时的地址变化</figcaption></figure><h2 id="_3-电可擦除可编程只读存储器-eeprom" tabindex="-1"><a class="header-anchor" href="#_3-电可擦除可编程只读存储器-eeprom" aria-hidden="true">#</a> 3.电可擦除可编程只读存储器(EEPROM)</h2><p>电可擦除可编程只读存储器 (E2PROM) 历史上被认为是闪存的前身，同时也是计算机系统中速度最慢的存储器。它相对于其他类型存储器的最大优势在于其能够在系统断电后仍能保留数据，这是因为其存储核心采用了浮栅MOS晶体管。相较于机电硬盘，它的尺寸相对较小，使其成为存储内置操作系统 (BIOS) 的理想选择，特别适用于手持计算平台。</p><p>典型的E2PROM存储器由多个扇区组成，每个扇区包含多个页面，如图5-31所示。E2PROM中的单个字可以通过指定其扇区地址、页面地址和行地址来定位。扇区地址表示特定字所在的扇区。页面地址定位扇区内的具体页面。最后，行地址指向页面内数据字节的位置。E2PROM中有五个控制信号用于执行读取、写入或擦除操作。活动低电平的使能信号（EN）将特定页面置于待机模式，并为即将进行的操作做好准备。活动低电平的命令使能信号（CE）与命令代码（如读取、写入（编程）或擦除）一起发出。活动低电平的地址使能信号（AE）在提供地址时发出。最后，活动低电平的写使能信号（WE）和读使能信号（RE）分别用于写入和读取数据。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/5/5-31-typical-eeprom-read-write-interface.png" alt="5-31：典型的EEPROM的组织形式" tabindex="0" loading="lazy"><figcaption>5-31：典型的EEPROM的组织形式</figcaption></figure><h2 id="_4-flash-memory" tabindex="-1"><a class="header-anchor" href="#_4-flash-memory" aria-hidden="true">#</a> 4.Flash memory</h2><p>闪存是电可擦除可编程只读存储器 (E2PROM) 的继任者，和它的前身一样，闪存也具备在断电后保留数据的能力。因此，闪存非常适合用于手持电脑、手机和其他移动平台。</p><p>典型的闪存由多个扇区和页面组成，如图5-43所示。通过指定扇区、页面和行地址，可以在闪存中找到一个八位字。为了与前一节给出的E2PROM架构示例兼容，该闪存也包含16个扇区和16个页面。每个页面包含256字节。扇区地址构成16位闪存地址的最高四位，即<code>Addr[15:12]</code>。每个扇区中的页面通过<code>Addr[11:8]</code>寻址，每个页面中的字节通过<code>Addr[7:0]</code>寻址。闪存中有五个主要控制信号，用于执行基本的读取、写入（编程）、擦除、保护和重置操作。在描述闪存操作时，写入和编程命令是等效的，可以互换使用。许多闪存数据手册使用编程一词来定义向闪存写入一个字节或一个数据块。</p><p>贴图</p>',11),u=e("p",null,[s("低电平有效的启用输入"),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("mover",{accent:"true"},[e("mrow",null,[e("mi",null,"E"),e("mi",null,"N")]),e("mo",{stretchy:"true"},"‾")])]),e("annotation",{encoding:"application/x-tex"},"\\overline{EN}")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.8833em"}}),e("span",{class:"mord overline"},[e("span",{class:"vlist-t"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.8833em"}},[e("span",{style:{top:"-3em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal",style:{"margin-right":"0.10903em"}},"EN")])]),e("span",{style:{top:"-3.8033em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"overline-line",style:{"border-bottom-width":"0.04em"}})])])])])])])])]),s("激活闪存中的特定页面，使其准备进行即将到来的操作。低电平有效的读取启用输入"),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("mover",{accent:"true"},[e("mrow",null,[e("mi",null,"R"),e("mi",null,"E")]),e("mo",{stretchy:"true"},"‾")])]),e("annotation",{encoding:"application/x-tex"},"\\overline{RE}")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.8833em"}}),e("span",{class:"mord overline"},[e("span",{class:"vlist-t"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.8833em"}},[e("span",{style:{top:"-3em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal",style:{"margin-right":"0.05764em"}},"RE")])]),e("span",{style:{top:"-3.8033em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"overline-line",style:{"border-bottom-width":"0.04em"}})])])])])])])])]),s("激活读/写接口，从内存中读取数据。低电平有效的写入启用输入"),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("mover",{accent:"true"},[e("mrow",null,[e("mi",null,"W"),e("mi",null,"E")]),e("mo",{stretchy:"true"},"‾")])]),e("annotation",{encoding:"application/x-tex"},"\\overline{WE}")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.8833em"}}),e("span",{class:"mord overline"},[e("span",{class:"vlist-t"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.8833em"}},[e("span",{style:{top:"-3em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"W"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.05764em"}},"E")])]),e("span",{style:{top:"-3.8033em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"overline-line",style:{"border-bottom-width":"0.04em"}})])])])])])])])]),s("使能向内存写入（编程）数据。低电平有效的重置输入"),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("mover",{accent:"true"},[e("mrow",null,[e("mi",null,"R"),e("mi",null,"E"),e("mi",null,"S"),e("mi",null,"E"),e("mi",null,"T")]),e("mo",{stretchy:"true"},"‾")])]),e("annotation",{encoding:"application/x-tex"},"\\overline{RESET}")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.8833em"}}),e("span",{class:"mord overline"},[e("span",{class:"vlist-t"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.8833em"}},[e("span",{style:{top:"-3em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"RESET")])]),e("span",{style:{top:"-3.8033em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"overline-line",style:{"border-bottom-width":"0.04em"}})])])])])])])])]),s("用于重置硬件，之后闪存会自动进入读取模式。")],-1),g=a('<p>典型的闪存架构与我们之前讨论的其他内存结构类似，由存储核心、地址解码器、感应放大器、数据缓冲区和控制逻辑组成，如图5-44所示。当内存操作开始时，控制逻辑会使能地址解码器、地址寄存器和适当的数据缓冲区，以激活读取或写入数据路径。地址寄存器中的地址被解码，以指向存储核心中的数据位置。如果需要执行读取操作，检索到的数据首先存储在数据缓冲区中，然后释放到总线。如果操作需要写入，数据首先存储在数据缓冲区中，然后定向到存储核心中的指定地址。待机模式既不向内存写入数据也不从中读取数据。休眠模式禁用地址解码器、存储核心和数据缓冲区，以减少功耗。图5-45列出了主要的闪存操作模式。</p><p>贴图</p><p>贴图</p><h2 id="_5-serial-flash-memory" tabindex="-1"><a class="header-anchor" href="#_5-serial-flash-memory" aria-hidden="true">#</a> 5.Serial Flash Memory</h2><p>最新的闪存芯片已经包含I2C或SPI接口，用于与主处理器或其他总线主控交互。用户不必处理序言、等待时间或串行总线的其他复杂性，只需编写符合I2C或SPI标准的嵌入式程序，即可启动对闪存的读取、写入或擦除操作。</p><h2 id="附" tabindex="-1"><a class="header-anchor" href="#附" aria-hidden="true">#</a> 附</h2><p><strong>Burst传输</strong>，可以翻译为<strong>突发传输</strong>或者是<strong>连续传输</strong>。是指在同一行中相邻的存储单元连续进行数据传输的方式，只要指定<strong>起始地址</strong>和<strong>突发长度</strong>（Burst lengths，可以理解为跨度），控制器就会依次自动对后面相同数量的存储单元进行读/写操作，而不需要控制器连续提供列地址。</p><h2 id="refernce" tabindex="-1"><a class="header-anchor" href="#refernce" aria-hidden="true">#</a> refernce</h2><ol><li>Toshiba datasheet TC59S6416/08/04BFT/BFTL-80, -10 Synchronous Dynamic RAM</li><li>Toshiba datasheet TC58DVM72A1FT00/TC58DVM72F1FT00 128Mbit E2PROM</li><li>Toshiba datasheet TC58256AFT 256Mbit E2PROM</li><li>Toshiba datasheet TC58FVT004/B004FT-85, -10, -12 4MBit CMOS Flash memory</li><li>Toshiba datasheet TC58FVT400/B400F/FT-85, -10, -12 4MBit CMOS Flash memory</li><li>Toshiba datasheet TC58FVT641/B641FT/XB-70, -10 64MBit CMOS Flash memory</li><li>Atmel datasheet AT26DF161 16Mbit serial data Flash memory</li></ol>',9),A=[c,i,r,m,d,p,h,u,g];function M(y,R){return l(),n("div",null,A)}const E=t(o,[["render",M],["__file","5-memory-circuits-and-system.html.vue"]]);export{E as default};
