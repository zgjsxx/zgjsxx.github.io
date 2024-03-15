import{_ as d,V as a,W as l,X as n,Y as e,$ as i,a0 as r,F as c}from"./framework-9a29aaa0.js";const v={},t=n("h1",{id:"操作系统1",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#操作系统1","aria-hidden":"true"},"#"),e(" 操作系统1")],-1),o=n("h2",{id:"两阶段引导加载程序",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#两阶段引导加载程序","aria-hidden":"true"},"#"),e(" 两阶段引导加载程序")],-1),u={href:"http://www.ctyme.com/intr/int-13.htm",target:"_blank",rel:"noopener noreferrer"},m=r(`<ul><li>重置磁盘（子功能<code>ah = 0x0</code>）</li><li>执行扩展读取以将 n 个块加载到内存中（子功能 <code>ah = 0x42</code>）</li></ul><p>中断 0x13 涵盖与磁盘相关的功能，子功能 <code>ah=0x42</code> 执行从磁盘到内存的扩展读取。<code>dl</code> 应该是 <code>0x80</code>（驱动器号），<code>ds:si</code> 应该包含描述我们要加载的内容以及加载位置的结构的地址：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">disk_addr_pkt</span> <span class="token punctuation">{</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> sz<span class="token punctuation">;</span>       <span class="token comment">// Size of packet = 0x10</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> _res<span class="token punctuation">;</span>     <span class="token comment">// Reserved, do not use</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">short</span> blk_cnt<span class="token punctuation">;</span> <span class="token comment">// How many blocks to transfer?</span>
    <span class="token keyword">void</span><span class="token operator">*</span>          buffer<span class="token punctuation">;</span>  <span class="token comment">// Address to load into</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span>  blk_num<span class="token punctuation">;</span> <span class="token comment">// Starting block number</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>“块”不是字节； 1 块 = 512 字节。 （磁盘对“块”的理解可能有所不同，但很多代码都是使用这种假设编写的，BIOS 会为我们进行转换。）</p><p>磁盘地址数据包必须在内存中对齐为 2 的倍数（即在字边界上）。数据包的“大小”存储在数据包内部，因为数据包结构有两种版本：我们上面使用的 16/32 位版本和 64 位版本，其中地址和块计数可以是64 位数量。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>;;;
;;; two-stage.s
;;; Illustrates a two-stage loader, where the first stage invokes the BIOS
;;; to load the second stage.
;;;

bits 16
org 0x7c00

start:
origin:     equ         0x7c00
blk_count:  equ         (end - loaded_code) / 512 + 1

; -----------------------------------------------------------------------------
; First stage loader

; Reset disk
mov ah, 0x0         ; Subfunction reset
mov dl, 0x80        ; Disk number
int 0x13

; Load blocks 
mov ah, 0x42        ; Int 0x13, subfunction Extended Read
mov dl, 0x80        ; Drive num
mov si, disk_packet ; Packet address
int 0x13

jmp loaded_code

; ----------------------------------------------------------------------------
; Begin &quot;pseudo-data&quot; section

string:         db      &quot;Hello, world!&quot;
strlen:         equ     $-string
screen_addr:    equ     0xb8000

align 2 
disk_packet:    db      0x10            ; Packet size
                db      0               ; Reserved
                dw      blk_count       ; Block count
                dd      loaded_code     ; Addr. to load
                dd      1               ; Starting block

; Pad remainder with 0 bytes
times 510 - ($ - $$)    db 0

; Write boot signature at end
dw 0xaa55

; -----------------------------------------------------------------------------
; Begin second-stage loader

loaded_code:

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

end:

; Pad so there&#39;s a good number of blocks used in the disk
times 1024 * 1024  db 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="进入32位保护模式" tabindex="-1"><a class="header-anchor" href="#进入32位保护模式" aria-hidden="true">#</a> 进入32位保护模式</h2><p>现在我们有了更多的代码（和数据）空间，我们可以将系统切换到 32 位保护模式。进入32位保护模式的基本步骤是</p><ul><li><p>禁用中断。我们不希望在更改系统模式时触发中断，因为中断处理程序将无法正常工作。</p></li><li><p>启用 A20 线，以允许更大的地址空间。 （请记住，在 16 位模式下，我们只能访问 20 位地址空间。）</p></li><li><p>加载带有段偏移量的全局描述符表 (GDT)。在 32 位模式下，段寄存器中的值不是直接用作段地址，而是作为表（GDT）的索引，其中表中的每个条目都包含有关该段的信息。</p></li><li><p>通过设置寄存器CR0的低位来切换到32位模式。</p></li></ul><h3 id="禁用中断" tabindex="-1"><a class="header-anchor" href="#禁用中断" aria-hidden="true">#</a> 禁用中断</h3>`,10),b={href:"https://staffwww.fullcoll.edu/aclifton/cs241/lecture-operating-systems-2.html",target:"_blank",rel:"noopener noreferrer"};function p(h,k){const s=c("ExternalLinkIcon");return a(),l("div",null,[t,o,n("p",null,[e("由于BIOS仅自动将磁盘的前 512 字节加载到内存中，因此我们必须自己加载其余部分。这将涉及调用中断"),n("a",u,[e("0x13"),i(s)]),e("，该中断用于操作磁盘。操作中断[0x13]一般需要两个步骤：")]),m,n("p",null,[e("原文链接："),n("a",b,[e("https://staffwww.fullcoll.edu/aclifton/cs241/lecture-operating-systems-2.html"),i(s)])])])}const _=d(v,[["render",p],["__file","Lecture25-OS-part2.html.vue"]]);export{_ as default};
