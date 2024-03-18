import{_ as d,V as s,W as a,X as e,Y as i,$ as r,a0 as l,F as t}from"./framework-9a29aaa0.js";const v={},c=l(`<h1 id="操作系统1" tabindex="-1"><a class="header-anchor" href="#操作系统1" aria-hidden="true">#</a> 操作系统1</h1><h2 id="构建操作系统的基础知识" tabindex="-1"><a class="header-anchor" href="#构建操作系统的基础知识" aria-hidden="true">#</a> 构建操作系统的基础知识</h2><p>课程的最后，我们将在原始虚拟机上启动我们自己的&quot;操作系统&quot;(原始的)。我们将使用 QEMU 作为虚拟机（它安装在服务器上，如果我们需要调试代码，它可以与 GDB 通信）。</p><p><strong>开机流程</strong></p><p>系统启动有两个过程（即，将控制从系统芯片上的硬编码功能转移到某些存储介质上定义的代码），这两个过程都涉及在存储设备上运行某些代码（硬编码功能）。驱动器、闪存驱动器、DVD 等）：</p><ul><li><strong>MBR</strong>：传统方式，引导存储设备的前 512 字节专用于主引导记录，其中应包含用于查找和运行操作系统其余部分的代码。该系统非常有限：每个驱动器只能有四个分区，并且引导记录的 512 字节大小限制意味着引导代码必须尽可能简单。另一方面，因为系统实际上只是直接从磁盘加载一些代码并开始运行它，所以这对我们来说是最容易编写的。</li></ul><p>（MBR 有时也用作磁盘格式化方案的名称，因为两者无法区分。）</p><ul><li><p><strong>EFI</strong>：更新、更灵活的方法，在磁盘上创建一个特殊分区来包含有关磁盘的所有其他可引导部分的信息。默认选择其中之一，启动它的代码驻留在 EFI 分区中。这使得管理启动过程对于最终用户来说更加简单和灵活，但对于我们来说却更加复杂。 EFI 还要求使用不同的方案（GPT）对磁盘进行格式化。</p><p>另一方面，虽然 MBR 引导加载程序可以通过 BIOS 访问一小部分、定义不明确的功能，但 EFI 已标准化，可以提供更多有关系统及其资源的信息。现代操作系统（在 EFI 之后编写的操作系统）可以利用这一点来查询系统已安装的硬件，并在操作系统内核本身开始启动之前进行配置，从而简化内核设计。</p></li></ul><p>我们将坚持使用 MBR，因为这对我们来说更容易。</p><h2 id="mbr" tabindex="-1"><a class="header-anchor" href="#mbr" aria-hidden="true">#</a> MBR</h2><p>MBR 格式的磁盘的前 512 字节专用于主引导记录。 MBR 包含分区表（定义如何将磁盘划分为最多四个分区）以及引导代码（在系统启动时执行）。反过来，如果每个分区被标记为可引导，则可以有自己的引导记录，其中包含自己的引导代码。 MBR 的典型行为只是找到第一个可启动分区，然后加载并运行其启动代码，但它也可以做更奇特的事情，例如显示可启动分区的菜单等。</p><p>就我们的目的而言，MBR 中的引导代码将是操作系统；也就是说，我们将直接将要运行的代码写入引导代码，而不是使用通用引导加载程序并将代码写入分区的引导记录。这意味着我们的操作系统将是磁盘上唯一允许的操作系统。</p><p>MBR 限制为 512 字节，但是这 512 字节在末尾之前包括分区表，定义磁盘上有哪些分区。我们将此表留空（用 0 填充），因为它对我们来说并不重要，但您应该知道它在那里。因此从技术上讲，MBR 中只有 440 字节可用于我们的代码。</p><table><thead><tr><th>内容</th><th>范围</th></tr></thead><tbody><tr><td>BootLoader</td><td>0-439(440 bytes)</td></tr><tr><td>Disk ID</td><td>440-443(4 bytes)</td></tr><tr><td>reserved,must be 0</td><td>444-445(2 bytes)</td></tr><tr><td>第一分区条目</td><td>446-461(16 bytes)</td></tr><tr><td>第二分区条目</td><td>462-477(16 bytes)</td></tr><tr><td>第三分区条目</td><td>478-493(16 bytes)</td></tr><tr><td>第四分区条目</td><td>494-509(16 bytes)</td></tr><tr><td>签名，必须是0xaa55</td><td>510-511(2 bytes)</td></tr></tbody></table><h2 id="_16位实模式" tabindex="-1"><a class="header-anchor" href="#_16位实模式" aria-hidden="true">#</a> 16位实模式</h2><p>当系统启动时，它以 16 位“实模式”运行，以便与旧软件兼容。虽然最终我们（希望）会过渡到 64 位模式，以便我们可以做我们期望的事情，但目前，我们会更容易适应在 16 位模式下工作。此外，在 16 位模式下，我们可以访问 BIOS，这是一组内置的实用程序操作，使我们能够相对轻松地执行输入/输出。当我们切换到64位模式后，BIOS将不可用，因此与用户的沟通变得更加困难和复杂。</p><p>在16位模式下，虽然我们可以访问32位寄存器，但所有内存地址都是16位。也就是说，我们只能访问 64KB 的内存！这显然不是我们想要的，因此 16 位模式大量使用分段。分段内存在启动时启用，我们无需执行任何操作即可将其打开。</p><p>内存位置的形式为 <code>SEGMENT:ADDRESS</code>，有效地址计算为 <code>SEGMENT * 0x10 + ADDRESS</code>。例如。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov word [es:si], ax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会将当前在 ax 中的字移动到内存位置 es * 0x10 + si 中。 es 是段寄存器之一；地址的段部分可以是常量，也可以是段寄存器之一。大多数指令将使用默认段：例如，mov 默认为 ds，即数据段，因此</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov word [si], ax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>等价于</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov word [ds:si], ax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>每个内存访问都将涉及显式段（常量）或段寄存器。</p><p>如果SEGMENT和ADDRESS都限制为16位，我们可以访问多少内存？ 64KB × 0x10 = 1MB。请注意，1MB 地址空间中的地址需要 20 位来表示； x86 的原始内存控制器只有 20 行。可以访问高于 1MB 的地址，但是，最初的行为是环绕这些地址，因此这仍然是许多 PC 的默认做法。要访问更多内存，必须启用 A20 线。</p><p>访问当前段中的数据/代码通常称为near，而访问当前段以外的段中的数据/代码称为far。后者需要先加载相关的段寄存器，因此速度较慢。例如，一些旧版本的 C 对“近”指针（指向当前段中的数据的指针）和“远”指针（指向不同段的指针）进行了区分。请注意，两种指针具有完全不同的表示形式！近指针只是一个无符号的 16 位值，但远指针必须同时存储段和地址，因此必须是 32 位。 （更糟糕的是，考虑当 p == q 时会发生什么，其中 p 和 q 是指向不同但可能重叠的段的指针。）</p><h2 id="段寄存器" tabindex="-1"><a class="header-anchor" href="#段寄存器" aria-hidden="true">#</a> 段寄存器</h2><p>段寄存器是下面这些：</p><p>CS Code 段（由 jmp 使用）</p><p>DS Data 段（mov 使用）</p><p>SS Stack段（推送使用）</p><p>ES Extra 段（由字符串操作使用）</p><p>FS 通用段</p><p>GS 通用段</p><p>同时使用 si 和 di 的字符串操作隐式使用数据段和额外段：ds:si 和 es:di。</p><p>要将值写入段寄存器，我们必须首先将其移至通用寄存器，然后移至段寄存器：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov ax, 0x10000
mov ds, ax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这意味着“远”内存访问需要三个指令，而不是“近”访问只需一个指令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mov ax, 0x10000
mov fs, ax
mov dword [fs:addr], ebx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>段寄存器也可以被压入堆栈或从堆栈弹出。 cs寄存器不能直接修改，因为它控制当前执行的程序在内存中的位置；即，指令指针实际上是 cs:ip。它通过“far jmp”（jmp SEGMENT:ADDRESS 形式的跳转）、远调用或远 ret 隐式更改。因为段寄存器对内存访问有很大的影响，所以它们都应该被视为被调用者保留，并在任何函数调用之前推送。</p><ul><li>片段可以重叠！发生这种情况是因为有效地址的计算是 0x10 * 段 + 偏移量</li><li>段寄存器中的值是相互独立的；其中一个的改变不会影响另一个。</li><li>为了使堆栈正常工作，堆栈段寄存器 ss 必须以堆栈不与其他段重叠的方式设置。</li></ul><h2 id="_32位模式" tabindex="-1"><a class="header-anchor" href="#_32位模式" aria-hidden="true">#</a> 32位模式</h2><p>在 32 位模式下，如果不启用分页，每个地址的段部分不再只是乘以 0x10，而是被视为段描述符表（称为全局描述符表）的索引。 GDT 为每个段存储其起始地址和长度，以及一些其他信息位。</p><p>当然，在32位模式下，地址已经是32位了，所以最简单的做法就是将所有段寄存器都设置为0，然后向GDT[0]加载从地址0开始的段的段描述符，并且具有与内存量相同的大小，从而使每个逻辑地址直接映射到相同的物理地址。这称为“32 位平面模式”。</p><h2 id="内存视图" tabindex="-1"><a class="header-anchor" href="#内存视图" aria-hidden="true">#</a> 内存视图</h2><p>传统上我们在 16 位模式下可用的 1MB 内存可以映射为：</p><h2 id="一个简单的引导加载程序" tabindex="-1"><a class="header-anchor" href="#一个简单的引导加载程序" aria-hidden="true">#</a> 一个简单的引导加载程序</h2><p>我们将首先编写一个简单的引导加载程序，该程序将仅显示 Hello, world!在屏幕上，然后进入无限循环，有效地挂起（虚拟！）机器。</p><p><strong>引导加载程序的结构</strong></p><p>引导加载程序的长度必须正好为 512 字节，并且必须以字值 0xAA55 结尾，这告诉 BIOS 这是一个有效的（可引导）记录。 BIOS 会将整个 512 字节加载到内存中，从地址 0x7c00 开始。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>;; 
;; hello-boot.s
;;
bits 16
org 0x7c00

; Boot code begins here
; ...

; Hang system
loop:       jmp loop

; Pad remainder with 0 bytes
times 510 - ($ - $$)    db 0

; Write boot signature at end
dw 0xaa55
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，虽然我们可以创建一个 <code>.s </code>文件来生成大于 512 字节的二进制文件，并且我们可以创建包含该二进制文件的磁盘映像，但系统只会将前 512 字节加载到内存中；如果我们想从磁盘加载任何额外的代码，我们必须手动执行。</p><p><code>bits</code>告诉 YASM 生成 16 位代码。这并不是绝对必要的，因为它在输出 bin 文件时默认生成 16 位代码，但有助于使我们在做什么变得显而易见。</p><p>为了组装这个，我们运行</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>yasm hello-boot.s -f bin -o boot.bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="写入屏幕-方法1-内存映射-io" tabindex="-1"><a class="header-anchor" href="#写入屏幕-方法1-内存映射-io" aria-hidden="true">#</a> 写入屏幕：方法1：内存映射 IO</h2><h2 id="写入屏幕-方法2-bios" tabindex="-1"><a class="header-anchor" href="#写入屏幕-方法2-bios" aria-hidden="true">#</a> 写入屏幕，方法2：BIOS</h2><p>我们还可以使用 BIOS 调用一次写入一个字符，而不是直接写入视频内存。</p><p>大多数处理视频的 BIOS 调用都是通过中断 0x10 进行的，这与我们上面用来设置视频模式的中断相同。</p><p>我们想要使用的所有中断都将使用 ax 作为子函数，使用 bl 作为页码（对我们来说，这应该始终为 0），以及用于各种用途的 cx 和 dx。我们需要做更多的工作来使其适合我们的寄存器。</p><p>要在屏幕上当前光标位置写入 al 中的字符：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov ah, 0x0a
mov al, character...
mov cx, 1 
int 0x10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们必须自己跟踪光标位置，但幸运的是 <code>bx</code>（字符串中的当前索引）可以作为光标位置执行双重任务。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov ah, 0x0a
mov dh, 0
mov dl, bl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>洗牌一些寄存器给我们</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>bits 16
org 0x7c00

; Set 80x25 text mode
mov ah, 0x0
mov al, 0x3
int 0x10

; Print text
mov si, 0          ; Memory index/cursor position
print:
    ; Print character
    mov ah, 0x0a    ; Subfunction = write char
    mov al, byte [si + string]
    mov bh, 0       ; Page = 0
    mov cx, 1       ; Write count = 1
    int 0x10

    ; Move cursor
    inc si
    mov ah, 0x02    ; Subfunction = set cursor pos.
    mov bh, 0       ; Page = 0
    mov dh, 0       ; Cursor row = 0
    mov dx, si      ; Cursor col = si
    mov dh, 0
    int 0x10

    cmp si, strlen
    jne print

; Infinite loop
forever: jmp forever

; Unreachable, 
string:         db      &quot;Hello, world!&quot;
strlen:         equ     $-string
screen_addr:    equ     0xb8000

; Pad remainder with 0 bytes
times 510 - ($ - $$)    db 0

; Write boot signature at end
dw 0xaa55
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,66),m={href:"https://staffwww.fullcoll.edu/aclifton/cs241/lecture-operating-systems-1.html",target:"_blank",rel:"noopener noreferrer"};function o(u,b){const n=t("ExternalLinkIcon");return s(),a("div",null,[c,e("p",null,[i("原文连接："),e("a",m,[i("https://staffwww.fullcoll.edu/aclifton/cs241/lecture-operating-systems-1.html"),r(n)])])])}const h=d(v,[["render",o],["__file","Lecture24-OS-part1.html.vue"]]);export{h as default};