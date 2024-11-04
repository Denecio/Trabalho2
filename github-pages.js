/*
    This file emulates the basic behaviour of github pages on localhost. The goal is twofold:
        - Hopefully help students understand what the github server is doing.
        - Allow students to debug locally.
*/

const fs = require('fs/promises') 
const path = require('path')
const http = require('http')

const fileExists = async path => !!(await fs.stat(path).catch(() => {}))
const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.md': 'text/plain',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.webm': 'video/webm'
}

async function serve(request, response) {
    let [path, extension] = redirect(request.url)
    
    if (await fileExists(path)) {
        response.writeHead(200, {'Content-Type': contentTypes[extension]})
        response.end(await fs.readFile(path))
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'})
        response.end('404 not found')
    }
}

function redirect(url) {
    if (url == '/') {
        return ['index.html', '.html']
    } else {
        let extension = path.extname(url)
        if (extension == '')
            return [url.slice(1) + '.html', '.html']

        return [url.slice(1), extension]
    }
}

http.createServer(serve).listen(3000)