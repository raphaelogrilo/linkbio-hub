"use client";

import { useState } from "react";

export default function NTWPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState<{ text: string; type: "sucesso" | "erro" } | null>(null);
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ text: "Formulário ainda não conectado a um serviço de envio.", type: "erro" });
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');
        :root {
          --navy:#071f3a; --navy2:#0c2e57; --blue:#2f86e4; --blue-soft:#7db4f0;
          --amber:#f6a623; --amber-deep:#ec8f0f;
          --glass:rgba(255,255,255,.06); --glass-line:rgba(255,255,255,.12);
          --ink:#eaf2fc; --mut:#9fb6d6;
          --disp:'Sora',-apple-system,sans-serif;
          --sans:'Manrope',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
        }
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:var(--sans); color:var(--ink);
          background:#04162c; display:flex; justify-content:center; -webkit-font-smoothing:antialiased;
          overflow-x:hidden;}
        .ntw-shell{position:relative; width:100%; max-width:470px; min-height:100vh; overflow:hidden;
          background:
            radial-gradient(90% 55% at 85% -5%, rgba(47,134,228,.40), transparent 55%),
            radial-gradient(70% 40% at 0% 12%, rgba(246,166,35,.12), transparent 55%),
            linear-gradient(180deg,var(--navy2) 0%, var(--navy) 42%, #04162c 100%);}
        @media(min-width:560px){
          .ntw-body{padding:40px 20px;}
          .ntw-shell{border-radius:32px; min-height:0;
            box-shadow:0 40px 100px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.06);}
        }
        .ntw-shell::before{content:""; position:absolute; top:-40px; right:-60px; width:340px; height:340px;
          background:repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 3px, transparent 3px 26px);
          -webkit-mask:radial-gradient(circle at 70% 30%, #000 0%, transparent 70%);
                  mask:radial-gradient(circle at 70% 30%, #000 0%, transparent 70%);
          pointer-events:none;}
        .ntw-wrap{position:relative; z-index:1; padding:26px 22px 30px;}

        .ntw-top{display:flex; align-items:center; justify-content:center; gap:16px; margin-bottom:34px;}
        .ntw-mark{height:53px; width:auto; flex:0 0 auto;}
        .ntw-wm{line-height:1; display:none;}
        .ntw-wm b{font-family:var(--disp); font-size:25px; font-weight:800; letter-spacing:-.02em; color:#fff;}
        .ntw-wm span{display:block; font-size:8px; font-weight:700; letter-spacing:.18em; color:var(--blue-soft); margin-top:4px; text-transform:uppercase;}
        .ntw-pin{margin-left:0; display:inline-flex; align-items:center; gap:6px; font-size:11px; font-weight:700;
          letter-spacing:.08em; color:var(--mut); background:var(--glass); border:1px solid var(--glass-line);
          padding:7px 12px; border-radius:999px; white-space:nowrap;}
        .ntw-pin .dot{width:6px;height:6px;border-radius:50%;background:var(--amber);flex:0 0 auto;}

        .ntw-h1{font-family:var(--disp); font-size:38px; line-height:1.04; font-weight:800; letter-spacing:-.03em;
          margin-bottom:16px; color:var(--ink);}
        .ntw-h1 .hl{color:var(--amber);}
        .ntw-sub{font-size:16px; line-height:1.55; color:var(--mut); max-width:32ch; margin-bottom:30px;}

        .ntw-acts{display:flex; flex-direction:column; gap:13px;}
        .ntw-btn{display:flex; align-items:center; gap:15px; text-decoration:none; padding:15px 16px;
          border-radius:18px; transition:transform .15s, box-shadow .15s, background .15s;
          cursor:pointer; border:none; font-family:inherit; background:none; width:100%;}
        .ntw-btn .ic{width:42px;height:42px;flex:0 0 auto; border-radius:13px;
          display:flex; align-items:center; justify-content:center;}
        .ntw-btn .tx{flex:1; font-family:var(--disp); font-weight:600; font-size:15.5px; letter-spacing:-.01em; line-height:1.2; text-align:left;}
        .ntw-btn .go{flex:0 0 auto; opacity:.6; color:var(--ink);}
        .ntw-btn:active{transform:scale(.985);}

        .ntw-btn.primary{background:linear-gradient(180deg,#f9b73f,var(--amber)); color:#3a2406;
          box-shadow:0 14px 30px rgba(246,166,35,.34);}
        .ntw-btn.primary .ic{background:rgba(58,36,6,.14); color:#4a2f06;}
        .ntw-btn.primary:hover{box-shadow:0 18px 40px rgba(246,166,35,.45); transform:translateY(-1px);}
        .ntw-btn.primary .go{color:#3a2406;}

        .ntw-btn.glass{background:var(--glass); border:1px solid var(--glass-line); color:#fff;
          -webkit-backdrop-filter:blur(8px); backdrop-filter:blur(8px);}
        .ntw-btn.glass .ic{background:rgba(47,134,228,.18); color:var(--blue-soft);}
        .ntw-btn.glass:hover{background:rgba(255,255,255,.10);}

        .ntw-btn.web{justify-content:center; gap:11px; border:1.5px solid var(--blue);
          color:#fff; margin-top:6px; padding:15px;}
        .ntw-btn.web .tx{flex:0 0 auto;}
        .ntw-btn.web:hover{background:rgba(47,134,228,.16);}

        .ntw-social{display:flex; justify-content:center; gap:12px; margin-top:24px;}
        .ntw-social a{flex:1; aspect-ratio:1; max-width:64px; border-radius:15px; background:var(--glass);
          border:1px solid var(--glass-line); display:flex; align-items:center; justify-content:center;
          color:#fff; text-decoration:none; transition:background .15s, transform .15s;}
        .ntw-social a:hover{background:rgba(47,134,228,.22); transform:translateY(-3px);}

        .ntw-card{margin-top:26px; background:rgba(255,255,255,.05); border:1px solid var(--glass-line);
          border-radius:22px; padding:8px; -webkit-backdrop-filter:blur(8px); backdrop-filter:blur(8px);}
        .ntw-crow{display:flex; align-items:center; gap:14px; padding:15px 14px; border-radius:15px;
          text-decoration:none; color:inherit;}
        .ntw-crow + .ntw-crow{border-top:1px solid var(--glass-line);}
        .ntw-crow:hover{background:rgba(255,255,255,.04);}
        .ntw-crow .ic{width:40px;height:40px;flex:0 0 auto;border-radius:12px;background:rgba(47,134,228,.18);
          color:var(--blue-soft); display:flex; align-items:center; justify-content:center;}
        .ntw-crow .lbl{display:none;}
        .ntw-crow .val{font-family:var(--disp); font-size:13px; font-weight:600; color:#fff;
          overflow-wrap:break-word; margin-top:2px;}

        .ntw-resp{margin-top:24px; display:flex; align-items:center; gap:16px;
          background:linear-gradient(135deg, rgba(47,134,228,.16), rgba(255,255,255,.03));
          border:1px solid var(--glass-line); border-radius:22px; padding:20px;}
        .ntw-resp .avatar{width:66px;height:66px;flex:0 0 auto;border-radius:18px;
          object-fit:cover; box-shadow:0 8px 20px rgba(0,0,0,.35);}
        .ntw-resp .lab{font-size:10px; font-weight:700; letter-spacing:.16em; text-transform:uppercase;
          color:var(--blue-soft); margin-bottom:5px;}
        .ntw-resp b{font-family:var(--disp); font-size:18px; font-weight:700; letter-spacing:-.01em; display:block; color:#fff;}
        .ntw-resp span{display:block; font-size:13px; color:var(--mut); margin-top:3px; line-height:1.45;}

        .ntw-footer{margin-top:30px; text-align:center; color:#6f8cb3;}
        .ntw-footer .cr{font-size:12px; line-height:1.55; max-width:34ch; margin:0 auto;}
        .ntw-footer .dev{margin-top:16px; font-size:11px; color:#577194;}
        .ntw-footer .dev a{display:inline-flex; align-items:center; gap:5px; color:inherit; text-decoration:none;}
        .ntw-footer .dev img{height:18px; width:auto; opacity:.6; transition:opacity .15s; display:block;}
        .ntw-footer .dev a:hover img{opacity:1;}

        .ntw-modal-overlay{position:fixed; inset:0; background:rgba(4,22,44,.75);
          display:flex; align-items:center; justify-content:center; padding:20px; z-index:1100;
          -webkit-backdrop-filter:blur(6px); backdrop-filter:blur(6px);}
        .ntw-modal-card{position:relative; width:100%; max-width:500px; max-height:90vh; overflow-y:auto;
          background:var(--navy2); border:1px solid var(--glass-line); border-radius:24px;
          box-shadow:0 40px 80px rgba(0,0,0,.5); padding:36px;}
        .ntw-modal-fechar{position:absolute; top:16px; right:18px; background:none; border:none;
          font-size:1.5rem; line-height:1; color:var(--mut); cursor:pointer; transition:color .15s;}
        .ntw-modal-fechar:hover{color:var(--ink);}
        .ntw-modal-titulo{font-family:var(--disp); font-size:1.25rem; font-weight:700; color:#fff; margin-bottom:6px;}
        .ntw-modal-subtitulo{color:var(--mut); font-size:.92rem; margin-bottom:24px; line-height:1.5;}
        .ntw-campo{margin-bottom:18px;}
        .ntw-campo label{display:block; font-weight:600; font-size:.88rem; margin-bottom:7px;
          color:var(--mut); letter-spacing:.04em;}
        .ntw-campo label .obrigatorio{color:var(--amber);}
        .ntw-campo input,.ntw-campo textarea{width:100%; padding:13px 15px; border:1.5px solid var(--glass-line);
          border-radius:12px; font-family:var(--sans); font-size:.95rem; color:var(--ink);
          background:var(--glass); transition:border-color .15s, box-shadow .15s;}
        .ntw-campo input::placeholder,.ntw-campo textarea::placeholder{color:var(--mut); opacity:.7;}
        .ntw-campo input:focus,.ntw-campo textarea:focus{outline:none; border-color:var(--blue);
          box-shadow:0 0 0 4px rgba(47,134,228,.18); background:rgba(255,255,255,.08);}
        .ntw-campo textarea{resize:vertical; min-height:100px;}
        .ntw-btn-enviar{width:100%; background:linear-gradient(180deg,#f9b73f,var(--amber)); color:#3a2406;
          font-family:var(--disp); font-weight:700; font-size:1rem;
          box-shadow:0 10px 26px rgba(246,166,35,.30); border-radius:14px; padding:15px;
          border:none; cursor:pointer; transition:box-shadow .15s, transform .15s;}
        .ntw-btn-enviar:hover{box-shadow:0 14px 34px rgba(246,166,35,.45); transform:translateY(-1px);}
        .ntw-btn-enviar:disabled{opacity:.65; cursor:not-allowed; transform:none;}
        .ntw-msg-sucesso{margin-top:16px; padding:13px 16px; border-radius:12px; font-size:.9rem; font-weight:600;
          background:rgba(31,122,77,.2); color:#6ee9a8; border:1px solid rgba(31,122,77,.4);}
        .ntw-msg-erro{margin-top:16px; padding:13px 16px; border-radius:12px; font-size:.9rem; font-weight:600;
          background:rgba(192,57,43,.2); color:#f9a8a8; border:1px solid rgba(192,57,43,.4);}

        @media(min-width:900px){
          .ntw-shell{max-width:1040px;}
          .ntw-shell::before{width:520px; height:520px; top:-60px; right:-90px;}
          .ntw-wrap{
            display:grid;
            grid-template-columns:1.06fr 0.94fr;
            column-gap:52px;
            align-items:start;
            grid-template-areas:
              "top    acts"
              "hero   acts"
              "sub    acts"
              "card   social"
              "card   resp"
              "foot   foot";
            padding:52px 52px 44px;
          }
          .ntw-top{grid-area:top; margin-bottom:34px; justify-content:flex-start;}
          .ntw-h1{grid-area:hero; font-size:54px; line-height:1.0; margin-bottom:18px; max-width:13ch;}
          .ntw-sub{grid-area:sub; font-size:18px; max-width:38ch; margin-bottom:0;}
          .ntw-acts{grid-area:acts; align-self:start; gap:14px;}
          .ntw-acts .ntw-btn{padding:17px 18px;}
          .ntw-acts .ntw-btn .tx{font-size:16px;}
          .ntw-social{grid-area:social; margin-top:32px; display:grid; grid-template-columns:repeat(4,1fr); gap:12px;}
          .ntw-social a{flex:none; width:auto; height:auto; max-width:none; aspect-ratio:1;}
          .ntw-mark{height:72px;}
          .ntw-pin{margin-left:20px; font-size:13px; padding:10px 18px;}
          .ntw-pin .dot{width:8px; height:8px;}
          .ntw-card{grid-area:card; margin-top:32px; align-self:start;}
          .ntw-crow .val{font-size:15px;}
          .ntw-resp{grid-area:resp; margin-top:16px;}
          .ntw-footer{grid-area:foot; margin-top:46px; padding-top:30px; border-top:1px solid var(--glass-line);
            display:grid; grid-template-columns:1.06fr 0.94fr; column-gap:52px; align-items:center; text-align:left;}
          .ntw-footer .cr{max-width:46ch; margin:0;}
          .ntw-footer .dev{margin-top:0; display:flex; align-items:center; justify-content:center; gap:10px; white-space:nowrap;}
        }
      `}</style>

      <div className="ntw-body" style={{ background: "#04162c", display: "flex", justifyContent: "center", minHeight: "100vh" }}>
        <main className="ntw-shell">
          <div className="ntw-wrap">

            <div className="ntw-top">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="ntw-mark" src="/clientes/ntw/logo-branca.webp" alt="Logo NTW" />
              <div className="ntw-wm"><b>ntw</b><span>Contabilidade e Gestão</span></div>
              <span className="ntw-pin"><span className="dot" />&nbsp;Timóteo · MG</span>
            </div>

            <h1 className="ntw-h1">Contabilidade <span className="hl">próxima</span> de você, em Timóteo.</h1>
            <p className="ntw-sub">Fale com a nossa equipe ou agende uma reunião com o contador.</p>

            <div className="ntw-acts">
              <button type="button" className="ntw-btn primary" onClick={() => setModalOpen(true)}>
                <span className="ic">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"/><path d="M9 13h6M9 17h4"/>
                  </svg>
                </span>
                <span className="tx">Contato inicial</span>
                <span className="go">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </button>

              <a className="ntw-btn glass" href="https://api.whatsapp.com/send/?phone=553186111994" target="_blank" rel="noopener noreferrer">
                <span className="ic">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2Z"/>
                  </svg>
                </span>
                <span className="tx">Fale com a equipe</span>
                <span className="go">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </a>

              <a className="ntw-btn glass" href="https://api.whatsapp.com/send/?phone=553198310900" target="_blank" rel="noopener noreferrer">
                <span className="ic">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                  </svg>
                </span>
                <span className="tx">Agendar reunião online — Contador</span>
                <span className="go">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </a>

              <a className="ntw-btn web" href="https://ntwcontabilidade.com.br/" target="_blank" rel="noopener noreferrer">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--blue-soft)" strokeWidth="2">
                  <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
                </svg>
                <span className="tx">Site NTW Contabilidade</span>
              </a>
            </div>

            <nav className="ntw-social" aria-label="Redes sociais">
              <a href="https://www.facebook.com/NTWTIMOTEO/" target="_blank" rel="noopener noreferrer" aria-label="Facebook da NTW Timóteo">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1Z"/></svg>
              </a>
              <a href="https://www.instagram.com/ntwtimoteo/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da NTW Timóteo">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/ntwtimoteo/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn da NTW Timóteo">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 8.5A1.5 1.5 0 1 0 6.5 5.5a1.5 1.5 0 0 0 0 3ZM5 10h3v9H5v-9Zm5 0h3v1.3c.5-.8 1.5-1.5 3-1.5 2.3 0 3 1.5 3 3.8V19h-3v-4.8c0-1.1-.4-1.7-1.4-1.7s-1.6.7-1.6 1.7V19h-3v-9Z"/></svg>
              </a>
              <a href="https://www.youtube.com/@ntwtimoteo" target="_blank" rel="noopener noreferrer" aria-label="YouTube da NTW Timóteo">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12s0-3-.4-4.3a2.6 2.6 0 0 0-1.8-1.8C18.4 5.5 12 5.5 12 5.5s-6.4 0-7.8.4A2.6 2.6 0 0 0 2.4 7.7C2 9 2 12 2 12s0 3 .4 4.3a2.6 2.6 0 0 0 1.8 1.8c1.4.4 7.8.4 7.8.4s6.4 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8C22 15 22 12 22 12Zm-12 2.6V9.4l4.5 2.6L10 14.6Z"/></svg>
              </a>
            </nav>

            <div className="ntw-card">
              <a className="ntw-crow" href="tel:+553186111994">
                <span className="ic">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>
                  </svg>
                </span>
                <span><span className="lbl">Telefone</span><span className="val">(31) 98611-1994</span></span>
              </a>
              <a className="ntw-crow" href="mailto:ntw.timoteo@ntwcontabilidade.com.br">
                <span className="ic">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 7 9 6 9-6"/>
                  </svg>
                </span>
                <span><span className="lbl">E-mail</span><span className="val">ntw.timoteo@ntwcontabilidade.com.br</span></span>
              </a>
              <a className="ntw-crow" href="https://www.google.com/maps/search/?api=1&query=R.+31+de+Mar%C3%A7o+205+loja+05+Centro+Tim%C3%B3teo+MG" target="_blank" rel="noopener noreferrer">
                <span className="ic">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <span><span className="lbl">Endereço</span><span className="val">R. 31 de Março, 205 — loja 05, Centro</span></span>
              </a>
            </div>

            <div className="ntw-resp">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="avatar" src="/clientes/ntw/tarcisio.webp" alt="Foto de Tarcísio Quaresma" />
              <div>
                <div className="lab">Responsável Técnico</div>
                <b>Tarcísio Quaresma</b>
                <span>CRC MG 107.375/O · Diretor Executivo</span>
              </div>
            </div>

            <footer className="ntw-footer">
              <div className="cr">© {new Date().getFullYear()} NTW Timóteo — Contabilidade e Gestão Empresarial. Todos os direitos reservados.</div>
              <div className="dev">Mini site desenvolvido por
                <a href="https://www.instagram.com/raphaelogrilo/" target="_blank" rel="noopener noreferrer" aria-label="Grilo Studio">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo-grilo.webp" alt="Grilo Studio" />
                </a>
              </div>
            </footer>

          </div>
        </main>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="ntw-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="ntw-modal-card" role="dialog" aria-modal="true" aria-labelledby="ntw-modal-titulo">
            <button type="button" className="ntw-modal-fechar" onClick={() => setModalOpen(false)} aria-label="Fechar formulário">&times;</button>
            <h3 id="ntw-modal-titulo" className="ntw-modal-titulo">Contato inicial</h3>
            <p className="ntw-modal-subtitulo">Preencha seus dados e a sua mensagem — nossa equipe retorna o contato o quanto antes.</p>
            <form onSubmit={handleSubmit}>
              <div className="ntw-campo">
                <label htmlFor="ntw-nome">Nome <span className="obrigatorio">*</span></label>
                <input type="text" id="ntw-nome" name="nome" required placeholder="Seu nome completo" />
              </div>
              <div className="ntw-campo">
                <label htmlFor="ntw-empresa">Empresa</label>
                <input type="text" id="ntw-empresa" name="empresa" placeholder="Nome da sua empresa (opcional)" />
              </div>
              <div className="ntw-campo">
                <label htmlFor="ntw-telefone">Telefone / WhatsApp <span className="obrigatorio">*</span></label>
                <input type="tel" id="ntw-telefone" name="telefone" required placeholder="(31) 90000-0000" />
              </div>
              <div className="ntw-campo">
                <label htmlFor="ntw-email">E-mail <span className="obrigatorio">*</span></label>
                <input type="email" id="ntw-email" name="email" required placeholder="seu@email.com" />
              </div>
              <div className="ntw-campo">
                <label htmlFor="ntw-mensagem">Mensagem</label>
                <textarea id="ntw-mensagem" name="mensagem" placeholder="Como podemos ajudar?" />
              </div>
              <button type="submit" className="ntw-btn-enviar" disabled={sending}>
                {sending ? "Enviando..." : "Enviar mensagem"}
              </button>
              {status && (
                <div className={status.type === "sucesso" ? "ntw-msg-sucesso" : "ntw-msg-erro"} role="status">
                  {status.text}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
