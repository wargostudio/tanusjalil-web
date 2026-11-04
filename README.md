# Tanus Jalil — sitio web

Sitio web de **Tanus Jalil e hijos S.R.L.**, mayoristas frutihortícolas del Mercado de Abasto de Córdoba, Argentina.
Publicado en [tanusjalil.com.ar](https://tanusjalil.com.ar).

Es un sitio estático (HTML, CSS y JavaScript, sin base de datos). Reemplaza al WordPress anterior y conserva el mismo contenido y las mismas direcciones de cada página.

## Páginas

| Español | English | Português |
|---|---|---|
| `/` Inicio | `/en/home/` | `/pt/home-pt/` |
| `/quienes-somos/` | `/en/about-us/` | `/pt/sobre-nos/` |
| `/productos/` | `/en/products/` | `/pt/produtos/` |
| `/proveedores/` | `/en/suppliers/` | `/pt/fornecedores/` |
| `/contacto/` | `/en/contact/` | `/pt/contato/` |

Además hay una ficha por producto en `/producto/<nombre>/` (40 productos).

El contacto es solo por WhatsApp (botón flotante en todas las páginas y en Contacto).

## Estructura

```
index.html            Inicio (español)
<página>/index.html   Cada página en su carpeta
assets/css/           Estilos
assets/js/            Slider, carrusel, filtros de productos y menú móvil
assets/img/           Imágenes
assets/docs/          Listado de compras (.docx)
.htaccess             Redirección de la página "Postulate" (dada de baja) al inicio
```

## Publicar en Hostinger

Subir todo el contenido del repositorio (incluido `.htaccess`) a `public_html`, con `index.html` en la raíz.
Los archivos CSS y JS llevan `?v=` en el enlace; si se modifican, conviene cambiar ese valor en los HTML para que los navegadores no usen la versión vieja guardada.

## Créditos

Diseño y desarrollo: [Wargo Studio](https://wargostudio.com/).
