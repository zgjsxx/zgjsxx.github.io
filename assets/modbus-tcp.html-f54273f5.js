import{_ as r,V as h,W as o,X as t,Y as d,$ as a,a0 as n,F as p}from"./framework-9a29aaa0.js";const i={},s=n('<h1 id="modbus-tcp" tabindex="-1"><a class="header-anchor" href="#modbus-tcp" aria-hidden="true">#</a> modbus-tcp</h1><p>Modbus协议通过主站（客户端）和从站（服务器）之间的请求-应答机制来交换信息。主站-从站原理是一个用于通讯协议的模式，其中一个设备（主站）控制一个或多个其它设备（从站）。在标准的 Modbus 网络中，有 1个主站和最多31 个从站。</p><h2 id="modbus报文解析" tabindex="-1"><a class="header-anchor" href="#modbus报文解析" aria-hidden="true">#</a> MODBUS报文解析</h2><p>| MBAP Header | Function code | Data | | Header | PDU |</p><p>MBAP header包含下面几个部分：</p><ul><li>Transaction ID</li><li>Protocol ID</li><li>Length</li><li>UnitID</li><li>FCode</li><li>Data</li></ul><table><thead><tr><th>id</th><th>名称</th><th>长度</th><th>说明</th></tr></thead><tbody><tr><td>1</td><td>Transaction ID 事务处理标识</td><td>2字节</td><td>报文的序列号，一般每次通讯加1，用于区别不同的报文</td></tr><tr><td>2</td><td>Protocol ID 协议标识</td><td>2字节</td><td>00 00 代表modbus-Tcp</td></tr><tr><td>3</td><td>Length</td><td>2字节</td><td>Unit长度 + PDU的长度</td></tr><tr><td>4</td><td>UnitID</td><td>单元标识符</td><td>1</td></tr></tbody></table><p>|00 01| 00 00|00 06| 01 |</p><p>上述序列代表：事务标识为1，协议是modbus-tcp协议，数据长度是：6，从站号是1。</p><p>需要注意的是MODBUS协议是一个<strong>大端</strong>的协议，前两个byte 00 01代表0x1 , 因此Transaction ID=1。而长度字段00 06代表0x6， 即UnitID和PDU的长度总和为6。</p><p>modbus的操作对象有四种：线圈、离散输入、输入寄存器、保持寄存器。</p><p>常用的功能码作用如下：</p><table><thead><tr><th>功能码</th><th>功能</th></tr></thead><tbody><tr><td>0x01</td><td>读单个或者多个线圈</td></tr><tr><td>0x05</td><td>写多个线圈</td></tr><tr><td>0x02</td><td>读离散量输入</td></tr><tr><td>0x04</td><td>读输入寄存器</td></tr><tr><td>0x03</td><td>读保持寄存器</td></tr><tr><td>0x06</td><td>写单个保持寄存器</td></tr><tr><td>0x10</td><td>写多个保持寄存器</td></tr></tbody></table><h2 id="常用功能码详解" tabindex="-1"><a class="header-anchor" href="#常用功能码详解" aria-hidden="true">#</a> 常用功能码详解</h2><h3 id="功能码0x1-读线圈寄存器" tabindex="-1"><a class="header-anchor" href="#功能码0x1-读线圈寄存器" aria-hidden="true">#</a> 功能码0x1：读线圈寄存器</h3><p>每个线圈寄存器可以存储一个bit的信息， 功能码0x01就是用于读取slave中线圈寄存器的状态，可以是<strong>单个线圈寄存器</strong>，也可以是<strong>多个连续的线圈寄存器</strong>。</p><p><strong>发送报文</strong></p><p>发送报文由下面几个部分组成，总共12字节：</p><p>MBAP header(7字节) + 功能码(1字节) + 线圈寄存器起始地址的高位（1字节） + 线圈寄存器起始地址的低位（1字节） + 线圈寄存器数量的高位（1字节） + 线圈寄存器数量的低位（1字节）</p><p>下面是一个用Modbus-Poll和Modbus-Slave测试的实际的例子，其含义是读取线圈寄存器的起始地址是0x0， 读取数量为 0x0a（十进制10）个。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/network/modbus-tcp/modbus-0x1-request.png" alt="0x1-request" tabindex="0" loading="lazy"><figcaption>0x1-request</figcaption></figure><table><thead><tr><th>MBAP header</th><th>功能码</th><th>起始地址高字节</th><th>起始地址低字节</th><th>寄存器数量的高位</th><th>寄存器数量的低位</th></tr></thead><tbody><tr><td>01 66 00 00 00 06 01</td><td>01</td><td>00</td><td>00</td><td>00</td><td>0a</td></tr></tbody></table><p>其中：</p><p>TransanctionID = 358, Length = 6。</p><p>功能码为0x1，代表读取线圈寄存器。</p><p>读取的线圈寄存器的起始地址为0。</p><p>读取的线圈寄存器的数量为0xa(十进制10)个。</p><p><strong>响应报文</strong></p><p>响应报文的长度不是固定的，长度和用户请求的数据长度有关，由下面几个部分组成：</p><p>MBAP header(7字节) + 功能码(1字节) + 线圈寄存器的值</p><p>下面是一个实际的响应报文的内容:</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/network/modbus-tcp/modbus-0x1-response.png" alt="0x1-request" tabindex="0" loading="lazy"><figcaption>0x1-request</figcaption></figure><table><thead><tr><th>MBAP header</th><th>功能码</th><th>字节数</th><th>请求的数据1</th><th>请求的数据2</th></tr></thead><tbody><tr><td>01 66 00 00 00 05 01</td><td>01</td><td>02</td><td>21</td><td>02</td></tr></tbody></table><p>返回的第一个字节21，转化为二进制为00100001， 其中bit0代表01寄存器，bit7代表07寄存器。</p><table><thead><tr><th>0x7</th><th>0x6</th><th>0x5</th><th>0x4</th><th>0x3</th><th>0x2</th><th>0x1</th><th>0x0</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td></tr></tbody></table><p>返回的第二个字节02，转化为二进制为00000010， 其中bit0代表08寄存器，bit1代表09寄存器。</p><table><thead><tr><th>0x9</th><th>0x8</th></tr></thead><tbody><tr><td>1</td><td>0</td></tr></tbody></table><h3 id="写单个线圈寄存器0x05" tabindex="-1"><a class="header-anchor" href="#写单个线圈寄存器0x05" aria-hidden="true">#</a> 写单个线圈寄存器0x05：</h3><p>将从站中的一个输出写成ON或OFF，0xFF00请求输出为ON,0x000请求输出为OFF</p><p>请求：MBAP 功能码 输出地址H 输出地址L 输出值H 输出值L（共12字节） 响应：MBAP 功能码 输出地址H 输出地址L 输出值H 输出值L（共12字节） 如：将地址为0x0003的线圈设为ON 00 01 00 00 00 06 01 | 05 00 03 FF 00 回：写入成功 00 01 00 00 00 06 01 |05 00 03 FF 00</p><h3 id="_0x0f-写多个线圈" tabindex="-1"><a class="header-anchor" href="#_0x0f-写多个线圈" aria-hidden="true">#</a> 0x0F：写多个线圈</h3><p>将一个从站中的一个线圈序列的每个线圈都强制为ON或OFF，数据域中置1的位请求相应输出位ON，置0的位请求响应输出为OFF</p><p>请求：MBAP 功能码 起始地址H 起始地址L 输出数量H 输出数量L 字节长度 输出值H 输出值L 响应：MBAP 功能码 起始地址H 起始地址L 输出数量H 输出数量L</p><h3 id="_0x02-读离散量输入" tabindex="-1"><a class="header-anchor" href="#_0x02-读离散量输入" aria-hidden="true">#</a> 0x02：读离散量输入</h3><p>从一个从站中读1~2000个连续的离散量输入状态</p><p>请求：MBAP 功能码 起始地址H 起始地址L 数量H 数量L（共12字节） 响应：MBAP 功能码 数据长度 数据（长度：9+ceil（数量/8）） 如：从地址0x0000开始读0x0012个离散量输入 00 01 00 00 00 06 01 02 00 00 00 12 回：数据长度为0x03个字节，数据为0x01 04 00，表示第一个离散量输入和第11个离散量输入为ON，其余为OFF 00 01 00 00 00 06 01 02 03 01 04 00</p><h3 id="_0x04-读输入寄存器" tabindex="-1"><a class="header-anchor" href="#_0x04-读输入寄存器" aria-hidden="true">#</a> 0x04：读输入寄存器</h3><p>从一个远程设备中读1~2000个连续输入寄存器</p><p>请求：MBAP 功能码 起始地址H 起始地址L 寄存器数量H 寄存器数量L（共12字节） 响应：MBAP 功能码 数据长度 寄存器数据(长度：9+寄存器数量×2) 如：读起始地址为0x0002，数量为0x0005的寄存器数据 00 01 00 00 00 06 01 04 00 02 00 05 回：数据长度为0x0A，第一个寄存器的数据为0x0c，其余为0x00 00 01 00 00 00 0D 01 04 0A 00 0C 00 00 00 00 00 00 00 00</p><h3 id="_0x03-读保持寄存器" tabindex="-1"><a class="header-anchor" href="#_0x03-读保持寄存器" aria-hidden="true">#</a> 0x03：读保持寄存器</h3><p>从远程设备中读保持寄存器连续块的内容</p><p>请求：MBAP 功能码 起始地址H 起始地址L 寄存器数量H 寄存器数量L（共12字节） 响应：MBAP 功能码 数据长度 寄存器数据(长度：9+寄存器数量×2) 如：起始地址是0x0000，寄存器数量是 0x0003 00 01 00 00 00 06 01 03 00 00 00 03 回：数据长度为0x06，第一个寄存器的数据为0x21，其余为0x00 00 01 00 00 00 09 01 03 06 00 21 00 00 00 00</p><h3 id="_0x06-写单个保持寄存器" tabindex="-1"><a class="header-anchor" href="#_0x06-写单个保持寄存器" aria-hidden="true">#</a> 0x06：写单个保持寄存器</h3><p>在一个远程设备中写一个保持寄存器</p><p>请求：MBAP 功能码 寄存器地址H 寄存器地址L 寄存器值H 寄存器值L（共12字节） 响应：MBAP 功能码 寄存器地址H 寄存器地址L 寄存器值H 寄存器值L（共12字节） 如：向地址是0x0000的寄存器写入数据0x000A 00 01 00 00 00 06 01 06 00 00 00 0A 回：写入成功 00 01 00 00 00 06 01 06 00 00 00 0A</p><h3 id="_0x10-写多个保持寄存器" tabindex="-1"><a class="header-anchor" href="#_0x10-写多个保持寄存器" aria-hidden="true">#</a> 0x10：写多个保持寄存器</h3><p>在一个远程设备中写连续寄存器块（1~123个寄存器）</p><p>请求：MBAP 功能码 起始地址H 起始地址L 寄存器数量H 寄存器数量L 字节长度 寄存器值（13+寄存器数量×2） 响应：MBAP 功能码 起始地址H 起始地址L 寄存器数量H 寄存器数量L（共12字节） 如：向起始地址为0x0000，数量为0x0001的寄存器写入数据，数据长度为0x02，数据为0x000F 00 01 00 00 00 09 01 10 00 00 00 01 02 00 0F 回：写入成功 00 01 00 00 00 06 01 10 00 00 00 01</p><p>实现代码</p>',59),x={href:"https://github.com/fz-lyu/modbuspp",target:"_blank",rel:"noopener noreferrer"},l=t("p",null,"调试工具",-1),c=t("p",null,"modbus poll： modbus客户端工具(主站)",-1),b=t("p",null,"modbus slave: modbus服务端工具(从站)",-1),u={href:"https://blog.csdn.net/qq_36958104/article/details/124193794",target:"_blank",rel:"noopener noreferrer"};function _(g,m){const e=p("ExternalLinkIcon");return h(),o("div",null,[s,t("p",null,[t("a",x,[d("https://github.com/fz-lyu/modbuspp"),a(e)])]),l,c,b,t("p",null,[d("参考文章 "),t("a",u,[d("https://blog.csdn.net/qq_36958104/article/details/124193794"),a(e)])])])}const L=r(i,[["render",_],["__file","modbus-tcp.html.vue"]]);export{L as default};
