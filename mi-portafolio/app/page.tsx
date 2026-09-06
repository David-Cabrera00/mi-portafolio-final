"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";

type Language = "es" | "en";
type Theme = "light" | "dark";

type ToastState = {
  msg: string;
  type: "" | "success" | "error";
  show: boolean;
};

type Particle = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
};

const translations: Record<Language, Record<string, string>> = {
  es: {
    nav_home: "Inicio",
    nav_about: "Sobre mí",
    nav_skills: "Habilidades",
    nav_projects: "Proyectos",
    nav_contact: "Contacto",
    hero_eyebrow: "¡Hola!",
    hero_name: "Yo soy David",
    hero_role: "Software Developer",
    hero_desc:
      "Soy ingeniero de software en proceso, amante del deporte y los videojuegos. Me dedico a la creación de soluciones para la web y he trabajado con tecnologías como TypeScript, Node.js, React, Django, Git, Java, Python y PostgreSQL.",
    hero_cta: "Trabajemos juntos",
    hero_cv: "Descargar CV",
    title_about: "Sobre mí",
    title_skills: "Habilidades",
    skills_desc:
      "Este es el conjunto de tecnologías que he aplicado en el desarrollo de proyectos académicos y reales, abarcando tanto el frontend como el backend. Utilizo estas herramientas con un enfoque en las mejores prácticas de la industria para construir aplicaciones rápidas, escalables y con un código sostenible.",
    about_text:
      "¡Hola! Soy David Andrés Cabrera, desarrollador web apasionado por crear soluciones tecnológicas que marquen la diferencia. Me especializo en transformar ideas en experiencias digitales: desde sitios web limpios hasta aplicaciones interactivas complejas. Mi prioridad es construir productos rápidos, accesibles y visualmente atractivos, aplicando siempre las mejores prácticas del sector. Cuando no estoy en el código, me gusta jugar fútbol, me gusta mucho ver MMA, en especial UFC, también disfruto mucho salir a caminar y pasar tiempo con mi familia, mi novia y mis amigos.",
    about_fact_name: "Nombre",
    about_fact_email: "Email",
    about_fact_location: "Ubicación",
    about_fact_location_value: "Pasto, Nariño, Colombia",
    about_fact_interests: "Intereses",
    about_fact_interests_value: "Deportes · Familia · Amigos",
    skill_0: "Código tipado y robusto para minimizar errores en producción.",
    skill_1: "Interfaces modernas, rápidas y optimizadas para SEO.",
    skill_2: "APIs escalables y eficientes con enfoque en el rendimiento.",
    skill_3: "Control de versiones y colaboración en equipo.",
    skill_4: "Aplicaciones sólidas y orientadas a objetos.",
    skill_5: "Scripting, automatización y desarrollo backend.",
    skill_6: "Bases de datos relacionales y consultas optimizadas.",
    title_projects: "Proyectos destacados",
    projects_desc:
      "Una selección de proyectos que reflejan mi trabajo en desarrollo frontend, diseño de interfaces y construcción de aplicaciones web.",
    ganaderia_type: "Plataforma de monitoreo",
    ganaderia_summary:
      "Aplicación web orientada a la gestión y monitoreo ganadero, con dashboard, control de animales, collares, geocercas, alertas y ubicaciones GPS.",
    deko_type: "E-commerce / UI",
    deko_summary:
      "Tienda web de muebles y decoración con una experiencia visual moderna, catálogo de productos y una interfaz enfocada en una navegación clara y atractiva.",
    flow_type: "Reproductor multimedia",
    flow_summary:
      "Reproductor de música desarrollado con una interfaz moderna y minimalista, centrada en una experiencia de reproducción sencilla, visual e interactiva.",
    btn_code: "Ver código",
    btn_demo: "Ver proyecto",
    title_testi: "Lo que dicen de mí",
    q1: "“[Cita breve sobre tu trabajo: profesionalidad, comunicación, cumplimiento de plazos, calidad].”",
    q2: "“[Cita breve sobre un resultado concreto o una experiencia de colaboración positiva].”",
    q3: "“[Cita breve destacando tu capacidad técnica y tu forma de trabajar].”",
    title_contact: "Contacto",
    contact_text:
      "¿Tienes un proyecto en mente o buscas incorporar talento? Hablemos. Respondo en menos de 24 horas.",
    f_name: "Tu nombre",
    f_email: "Tu email",
    f_msg: "Cuéntame sobre tu proyecto o vacante",
    f_submit: "Enviar mensaje",
    footer_rights: "David Cabrera. Todos los derechos reservados.",
    toast_demo:
      "Mensaje enviado (demo). Configura tu URL de Formspree para recibir mensajes reales.",
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_contact: "Contact",
    hero_eyebrow: "Hi!",
    hero_name: "I'm David",
    hero_role: "Software Developer",
    hero_desc:
      "I'm a software engineer in the making, passionate about sports and video games. I build solutions for the web and have worked with technologies like TypeScript, Node.js, React, Django, Git, Java, Python and PostgreSQL.",
    hero_cta: "Let's work together",
    hero_cv: "Download CV",
    title_about: "About me",
    title_skills: "Skills",
    skills_desc:
      "This is the set of technologies I have applied in academic and real-world projects, covering both frontend and backend. I use these tools with a focus on industry best practices to build fast, scalable applications with sustainable code.",
    about_text:
      "Hi! I'm David Andrés Cabrera, a web developer passionate about creating tech solutions that make a difference. I specialize in turning ideas into digital experiences: from clean websites to complex interactive applications. My priority is building fast, accessible and visually appealing products, always applying industry best practices. When I'm not coding, I like playing soccer, I really enjoy watching MMA, especially UFC, and I also enjoy going for walks and spending time with my family, my girlfriend and my friends.",
    about_fact_name: "Name",
    about_fact_email: "Email",
    about_fact_location: "Location",
    about_fact_location_value: "Pasto, Nariño, Colombia",
    about_fact_interests: "Interests",
    about_fact_interests_value: "Sports · Family · Friends",
    skill_0: "Typed, robust code to minimize errors in production.",
    skill_1: "Modern, fast interfaces optimized for SEO.",
    skill_2: "Scalable, efficient APIs focused on performance.",
    skill_3: "Version control and team collaboration.",
    skill_4: "Solid, object-oriented applications.",
    skill_5: "Scripting, automation and backend development.",
    skill_6: "Relational databases and optimized queries.",
    title_projects: "Featured projects",
    projects_desc:
      "A selection of projects that reflect my work in frontend development, interface design and web application development.",
    ganaderia_type: "Monitoring platform",
    ganaderia_summary:
      "Web application focused on livestock management and monitoring, including a dashboard, animal control, collars, geofences, alerts and GPS locations.",
    deko_type: "E-commerce / UI",
    deko_summary:
      "Furniture and decoration web store with a modern visual experience, product catalog and an interface focused on clear and attractive navigation.",
    flow_type: "Media player",
    flow_summary:
      "Music player built with a modern and minimalist interface focused on a simple, visual and interactive playback experience.",
    btn_code: "View code",
    btn_demo: "View project",
    title_testi: "What they say about me",
    q1: "“[Short quote about your work: professionalism, communication, deadlines, quality].”",
    q2: "“[Short quote about a concrete result or a positive collaboration experience].”",
    q3: "“[Short quote highlighting your technical ability and working style].”",
    title_contact: "Contact",
    contact_text:
      "Have a project in mind or looking to add talent? Let's talk. I reply within 24 hours.",
    f_name: "Your name",
    f_email: "Your email",
    f_msg: "Tell me about your project or vacancy",
    f_submit: "Send message",
    footer_rights: "David Cabrera. All rights reserved.",
    toast_demo:
      "Message sent (demo). Set the form endpoint to receive real messages.",
  },
};

const skills = [
  { name: "TypeScript" },
  { name: "React" },
  { name: "Node.js" },
  { name: "Git" },
  { name: "Java" },
  { name: "Python" },
  { name: "PostgreSQL" },
];

function SkillIcon({ name }: { name: string }) {
  switch (name) {
    case "TypeScript":
      return (
        <svg viewBox="0 0 24 24" width={40} height={40} role="img" aria-label="TypeScript" fill="#3178C6">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
        </svg>
      );
    case "React":
      return (
        <svg viewBox="0 0 24 24" width={40} height={40} role="img" aria-label="React" fill="#61DAFB">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
        </svg>
      );
    case "Node.js":
      return (
        <svg viewBox="0 0 24 24" width={40} height={40} role="img" aria-label="Node.js" fill="#5FA04E">
        <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
        </svg>
      );
    case "Git":
      return (
        <svg viewBox="0 0 24 24" width={40} height={40} role="img" aria-label="Git" fill="#F03C2E">
        <path d="M13.09 23.549a1.54 1.54 0 0 1-2.18 0L.451 13.089a1.54 1.54 0 0 1 0-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 0 0 .964 2.326v6.66a1.849 1.849 0 1 0 1.54 0V8.957l2.508 2.508a1.85 1.85 0 1 0 1.09-1.09l-2.634-2.634a1.85 1.85 0 0 0-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 0 1 2.179 0l10.459 10.46a1.54 1.54 0 0 1 0 2.179z" />
        </svg>
      );
    case "Java":
      return (
        <svg viewBox="0 0 128 128" width={46} height={46} role="img" aria-label="Java">
        <path d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z" fill="#0074BD" />
        <path d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z" fill="#EA2D2E" />
        <path d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z" fill="#0074BD" />
        <path d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z" fill="#EA2D2E" />
        <path d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z" fill="#0074BD" />
        </svg>
      );
    case "Python":
      return (
        <svg viewBox="0 0 24 24" width={40} height={40} role="img" aria-label="Python" fill="#3776AB">
        <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
        </svg>
      );
    case "PostgreSQL":
      return (
        <svg viewBox="0 0 24 24" width={40} height={40} role="img" aria-label="PostgreSQL" fill="#4169E1">
        <path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z" />
        </svg>
      );
    default:
      return null;
  }
}

type SocialIconName = "LinkedIn" | "GitHub" | "Instagram" | "Email";

function SocialIcon({ name, size = 18 }: { name: SocialIconName; size?: number }) {
  if (name === "Email") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    );
  }

  switch (name) {
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
      );
    case "GitHub":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.1 11.1 0 0 1 5.77 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.35.78 1.05.78 2.12v3.14c0 .3.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      );
    default:
      return null;
  }
}

const projects = [
  {
    id: "ganaderia",
    name: "Ganadería 4.0",
    typeKey: "ganaderia_type",
    summaryKey: "ganaderia_summary",
    image: "./assets/projects/ganaderia.png",
    tags: ["React", "TypeScript", "Vite", "Zustand"],
    demo: "https://ganaderia-40.vercel.app/",
    repo: "https://github.com/David-Cabrera00/ganaderia-frontend.git",
  },
  {
    id: "deko",
    name: "Deko Rando",
    typeKey: "deko_type",
    summaryKey: "deko_summary",
    image: "./assets/projects/de-ko.png",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    demo: "https://deko-rando.vercel.app/",
    repo: "https://github.com/David-Cabrera00/frontend-deko-rando.git",
  },
  {
    id: "flow",
    name: "Flow Music Player",
    typeKey: "flow_type",
    summaryKey: "flow_summary",
    image: "/assets/projects/music.png",
    tags: ["React", "TypeScript", "Vite", "Lucide"],
    demo: "https://flow-music-player.vercel.app/",
    repo: "https://github.com/David-Cabrera00/FlowMusic-Player.git",
  },
];

const navItems = [
  { id: "hero", key: "nav_home" },
  { id: "sobre-mi", key: "nav_about" },
  { id: "habilidades", key: "nav_skills" },
  { id: "proyectos", key: "nav_projects" },
  { id: "contacto", key: "nav_contact" },
];

export default function Portfolio() {
  const [lang, setLang] = useState<Language>("es");
  const [theme, setTheme] = useState<Theme>("light");
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollBtns, setShowScrollBtns] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    msg: "",
    type: "",
    show: false,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigationTargetRef = useRef<string | null>(null);

  const t = (key: string) => translations[lang][key] ?? key;

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    const initialLang: Language = savedLang === "en" ? "en" : "es";

    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme: Theme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : systemDark
          ? "dark"
          : "light";

    setLang(initialLang);
    setTheme(initialTheme);
    document.documentElement.lang = initialLang;
    document.documentElement.setAttribute("data-theme", initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
    document.title =
      lang === "es"
        ? "David Cabrera | Ingeniero de Software"
        : "David Cabrera | Software Engineer";
  }, [lang]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 641px)");

    const updateViewport = () => {
      setIsDesktop(media.matches);
    };

    updateViewport();
    media.addEventListener("change", updateViewport);

    return () => {
      media.removeEventListener("change", updateViewport);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollBtns(scrollY > 500);

      // Mientras una navegación por click está en curso,
      // mantenemos marcada la sección elegida para que el scroll suave
      // no vuelva a activar temporalmente la sección anterior.
      if (navigationTargetRef.current) {
        setActiveSection(navigationTargetRef.current);
        return;
      }

      // La línea de activación está debajo del navbar fijo.
      // Esto hace el scroll-spy más natural al desplazarse manualmente.
      const activationLine =
        scrollY + Math.min(window.innerHeight * 0.3, 220);

      let currentSection = "hero";

      for (const item of navItems) {
        const element = document.getElementById(item.id);

        if (element && element.offsetTop <= activationLine) {
          currentSection = item.id;
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrameId = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(36, Math.floor(width / 35));

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.25 + 0.05,
      }));
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      context.clearRect(0, 0, width, height);

      const accent =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--accent")
          .trim() || "#4f46e5";

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = accent;
        context.globalAlpha = particle.opacity;
        context.fill();
      }

      context.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const gsapContext = gsap.context(() => {
      const heroTimeline = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      heroTimeline
        .from(".hero-card", { y: 30, opacity: 0, duration: 0.7 })
        .from(
          ".hero-photo",
          { scale: 0.6, opacity: 0, duration: 0.5 },
          "-=0.35",
        )
        .from(
          ".hero-eyebrow",
          { y: 12, opacity: 0, duration: 0.4 },
          "-=0.3",
        )
        .from(
          ".hero-name",
          { y: 16, opacity: 0, duration: 0.5 },
          "-=0.25",
        )
        .from(
          ".hero-description",
          { y: 12, opacity: 0, duration: 0.4 },
          "-=0.25",
        )
        .from(
          ".hero-actions .btn",
          { y: 10, opacity: 0, stagger: 0.08, duration: 0.35 },
          "-=0.2",
        );

      gsap.utils
        .toArray<HTMLElement>(
          ".section-title, .carousel, .projects-grid, .testimonials-grid, .contact-grid",
        )
        .forEach((element) => {
          gsap.from(element, {
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
            },
            y: 24,
            opacity: 0,
            duration: 0.6,
          });
        });
    }, pageRef);

    return () => {
      gsapContext.revert();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }

      if (navigationTimerRef.current) {
        clearTimeout(navigationTimerRef.current);
      }
    };
  }, []);

  const handleNavNavigate = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    if (navigationTimerRef.current) {
      clearTimeout(navigationTimerRef.current);
    }

    navigationTargetRef.current = id;
    setActiveSection(id);
    setNavOpen(false);

    // Altura aproximada del navbar + separación superior.
    // Deja el título de la sección visible debajo de la cápsula.
    const navbarOffset = 118;
    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - navbarOffset;

    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `#${id}`);
    }

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });

    // Cuando termina aproximadamente el scroll suave,
    // volvemos a dejar que el scroll-spy controle el estado activo.
    navigationTimerRef.current = setTimeout(() => {
      navigationTargetRef.current = null;
      setActiveSection(id);
    }, 1200);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToast({
      msg: t("toast_demo"),
      type: "success",
      show: true,
    });

    toastTimerRef.current = setTimeout(() => {
      setToast((previous) => ({ ...previous, show: false }));
    }, 3500);

    formRef.current?.reset();
  };

  const getCardStyle = (index: number): CSSProperties => {
    const offset = index - activeIndex;
    const distance = Math.abs(offset);
    const direction = Math.sign(offset);

    if (isDesktop) {
      if (offset === 0) {
        return {
          transform: "translateY(-18px) translateZ(70px) scale(1.1)",
          zIndex: 20,
          opacity: 1,
          pointerEvents: "auto",
        };
      }

      const zRotation = index % 2 === 0 ? -3 : 3;

      return {
        transform: `translateZ(${-45 * Math.min(distance, 2)}px) rotateY(${direction * 30}deg) rotateZ(${zRotation}deg) translateY(${distance * 12}px) scale(${Math.max(1 - distance * 0.06, 0.85)})`,
        zIndex: 20 - distance,
        opacity: Math.max(1 - distance * 0.18, 0.4),
        pointerEvents: "auto",
      };
    }

    const x = offset === 0 ? 0 : direction * 310 * distance;

    return {
      transform: `translateX(${x}px) scale(${offset === 0 ? 1 : 0.9})`,
      opacity: offset === 0 ? 1 : 0,
      zIndex: offset === 0 ? 2 : 1,
      pointerEvents: offset === 0 ? "auto" : "none",
    };
  };

  const previousSkill = () => {
    setActiveIndex((previous) =>
      previous === 0 ? skills.length - 1 : previous - 1,
    );
  };

  const nextSkill = () => {
    setActiveIndex((previous) =>
      previous === skills.length - 1 ? 0 : previous + 1,
    );
  };

  return (
    <div ref={pageRef}>
      <Navbar
        lang={lang}
        theme={theme}
        navOpen={navOpen}
        activeSection={activeSection}
        onToggleLanguage={() =>
          setLang((current) => (current === "es" ? "en" : "es"))
        }
        onToggleTheme={() =>
          setTheme((current) => (current === "dark" ? "light" : "dark"))
        }
        onToggleMenu={() => setNavOpen((current) => !current)}
        onCloseMenu={() => setNavOpen(false)}
        onNavigate={handleNavNavigate}
      />

      <main>
        <section id="hero" className="hero">
          <div className="bg-orbs" aria-hidden="true">
            <span className="orb orb-1" />
            <span className="orb orb-2" />
            <span className="orb orb-3" />
          </div>

          <canvas ref={canvasRef} id="particles" aria-hidden="true" />

          <div className="container">
            <div className="hero-card">
              <div className="hero-photo">
                <img src="/assets/profile.jpeg" alt="David Cabrera" />
              </div>

              <div className="hero-content">
                <p className="hero-eyebrow">{t("hero_eyebrow")}</p>
                <h1 className="hero-name">{t("hero_name")}</h1>
                <p className="hero-role">{t("hero_role")}</p>
                <p className="hero-description">{t("hero_desc")}</p>

                <div className="hero-actions">
                  <a href="#contacto" className="btn btn-primary">
                    {t("hero_cta")}
                  </a>
                  <a
                    href="/assets/cv/cv.pdf"
                    className="btn btn-secondary"
                    download
                  >
                    {t("hero_cv")}
                  </a>
                </div>

                <div className="hero-contact">
                  <a href="mailto:david.cabrerabelal@gmail.com">
                    <SocialIcon name="Email" size={16} />
                    david.cabrerabelal@gmail.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/david-cabrera-209a4a407/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <SocialIcon name="LinkedIn" />
                  </a>
                  <a
                    href="https://github.com/David-Cabrera00"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <SocialIcon name="GitHub" />
                  </a>
                  <a
                    href="https://www.instagram.com/david.cabrera__/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <SocialIcon name="Instagram" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="sobre-mi" className="section">
          <div className="container">
            <h2 className="section-title">{t("title_about")}</h2>

            <div className="about-grid">
              <div className="about-photos">
                <div className="about-photo about-photo-main">
                  <img src="/assets/foto2.jpeg" alt="David Cabrera" />
                </div>
                <div className="about-photo about-photo-small">
                  <img src="/assets/futbol.jpeg" alt="David jugando fútbol" />
                </div>
                <div className="about-photo about-photo-mini">
                  <img src="/assets/novia.jpeg" alt="David con su novia" />
                </div>
              </div>

              <div className="about-content">
                <p className="about-text">{t("about_text")}</p>

                <ul className="about-facts">
                  <li>
                    <span className="about-fact-text">
                      <span className="about-fact-label">{t("about_fact_name")}</span>
                      <strong>David Andrés Cabrera</strong>
                    </span>
                  </li>
                  <li>
                    <span className="about-fact-text">
                      <span className="about-fact-label">{t("about_fact_email")}</span>
                      <strong>david.cabrerabelal@gmail.com</strong>
                    </span>
                  </li>
                  <li>
                    <span className="about-fact-text">
                      <span className="about-fact-label">
                        {t("about_fact_location")}
                      </span>
                      <strong>{t("about_fact_location_value")}</strong>
                    </span>
                  </li>
                  <li>
                    <span className="about-fact-text">
                      <span className="about-fact-label">
                        {t("about_fact_interests")}
                      </span>
                      <strong>{t("about_fact_interests_value")}</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="habilidades" className="section">
          <div className="container">
            <h2 className="section-title">{t("title_skills")}</h2>
            <p className="about-text">{t("skills_desc")}</p>

            <div className="carousel">
              <div className="carousel-track">
                {skills.map((skill, index) => (
                  <article
                    key={skill.name}
                    className={`skill-card ${activeIndex === index ? "active" : ""}`}
                    style={getCardStyle(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    tabIndex={0}
                  >
                    <div className="skill-icon">
                      <SkillIcon name={skill.name} />
                    </div>
                    <h3 className="skill-name">{skill.name}</h3>
                    <p className="skill-level">{t(`skill_${index}`)}</p>
                  </article>
                ))}
              </div>

              <div className="carousel-controls">
                <div className="carousel-nav">
                  <button
                    type="button"
                    className="carousel-btn carousel-prev"
                    onClick={previousSkill}
                    aria-label="Anterior"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="carousel-btn carousel-next"
                    onClick={nextSkill}
                    aria-label="Siguiente"
                  >
                    ›
                  </button>
                </div>

                <div className="carousel-counter" aria-live="polite">
                  <span>{activeIndex + 1}</span>
                  <span>/</span>
                  <span>{skills.length}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="proyectos" className="section section-alt">
          <div className="container">
            <h2 className="section-title">{t("title_projects")}</h2>
            <p className="projects-description">{t("projects_desc")}</p>

            <div className="projects-grid">
              {projects.map((project) => (
                <article key={project.id} className="project-card">
                  <div className="project-preview">
                    <img
                      src={project.image}
                      alt={`Vista previa de ${project.name}`}
                      className="project-preview-image"
                      loading="lazy"
                    />

                    <div className="project-preview-overlay" aria-hidden="true" />

                    <span className="project-preview-type">
                      {t(project.typeKey)}
                    </span>
                  </div>

                  <div className="project-content">
                    <div className="project-meta">
                      <span>{t(project.typeKey)}</span>
                      <span>Web</span>
                    </div>

                    <h3>{project.name}</h3>

                    <p className="project-summary">
                      {t(project.summaryKey)}
                    </p>

                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <div className="project-links">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-small btn-primary"
                        aria-label={`${t("btn_demo")}: ${project.name}`}
                      >
                        {t("btn_demo")} ↗
                      </a>

                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-small btn-secondary"
                        aria-label={`${t("btn_code")}: ${project.name}`}
                      >
                        {t("btn_code")}
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonios" className="section">
          <div className="container">
            <h2 className="section-title">{t("title_testi")}</h2>

            <div className="testimonials-grid">
              <blockquote className="testimonial-card">
                <div
                  className="testimonial-avatar"
                  style={{ background: "#5b8def" }}
                >
                  NA
                </div>
                <p>{t("q1")}</p>
                <footer>— Nombre Apellido, Cargo · Empresa</footer>
              </blockquote>

              <blockquote className="testimonial-card">
                <div
                  className="testimonial-avatar"
                  style={{ background: "#22d3ee" }}
                >
                  JC
                </div>
                <p>{t("q2")}</p>
                <footer>— Nombre Apellido, Cargo · Empresa</footer>
              </blockquote>

              <blockquote className="testimonial-card">
                <div
                  className="testimonial-avatar"
                  style={{ background: "#a259ff" }}
                >
                  LM
                </div>
                <p>{t("q3")}</p>
                <footer>— Nombre Apellido, Cargo · Empresa</footer>
              </blockquote>
            </div>
          </div>
        </section>

        <section id="contacto" className="section">
          <div className="container">
            <h2 className="section-title">{t("title_contact")}</h2>

            <div className="contact-grid">
              <div className="contact-info">
                <p className="contact-text">{t("contact_text")}</p>

                <a
                  className="contact-link"
                  href="mailto:david.cabrerabelal@gmail.com"
                >
                  <SocialIcon name="Email" />
                  david.cabrerabelal@gmail.com
                </a>
                <a
                  className="contact-link"
                  href="https://www.linkedin.com/in/david-cabrera-209a4a407/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon name="LinkedIn" />
                  LinkedIn
                </a>
                <a
                  className="contact-link"
                  href="https://github.com/David-Cabrera00"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon name="GitHub" />
                  GitHub
                </a>
                <a
                  className="contact-link"
                  href="https://www.instagram.com/david.cabrera__/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon name="Instagram" />
                  Instagram
                </a>
              </div>

              <form
                className="contact-form"
                ref={formRef}
                onSubmit={handleFormSubmit}
              >
                <input
                  type="text"
                  name="nombre"
                  placeholder={t("f_name")}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t("f_email")}
                  required
                />
                <textarea
                  name="mensaje"
                  rows={5}
                  placeholder={t("f_msg")}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  {t("f_submit")}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-made">
            Hecho con <span className="footer-heart">&hearts;</span> por{" "}
            <span className="footer-name">David Cabrera</span>
          </div>

          <div className="footer-social">
            <a
              href="https://www.linkedin.com/in/david-cabrera-209a4a407/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <SocialIcon name="LinkedIn" />
            </a>
            <a
              href="https://github.com/David-Cabrera00"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <SocialIcon name="GitHub" />
            </a>
            <a
              href="https://www.instagram.com/david.cabrera__/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <SocialIcon name="Instagram" />
            </a>
          </div>

          <p className="footer-copy">
            &copy; {new Date().getFullYear()} {t("footer_rights")}
          </p>
        </div>
      </footer>

      <a
        href="/assets/cv/cv.pdf"
        className={`float-cv ${showScrollBtns ? "visible" : ""}`}
        download
      >
        {t("hero_cv")}
      </a>

      <button
        type="button"
        className={`back-top ${showScrollBtns ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Volver arriba"
      >
        ↑
      </button>

      <div
        className={`toast ${toast.type} ${toast.show ? "show" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toast.msg}
      </div>
    </div>
  );
}
