# Koodiklinikka
![Travis](https://travis-ci.org/koodiklinikka/koodiklinikka.fi.svg?branch=master)

<img align="right" src="https://raw.githubusercontent.com/koodiklinikka/koodiklinikka.fi/master/static/images/logo.png" alt="Koodiklinikka-logo">

**Koodiklinikka.fi lähdekoodi**. [Issueita](https://github.com/koodiklinikka/koodiklinikka.fi/issues) ja [Pull Requestejä](https://github.com/koodiklinikka/koodiklinikka.fi/pulls) otetaan lämpimästi vastaan. Yritämme pitää kynnyksen kontribuoida projektiin alhaisena, jotta mahdollisimman moni pääsisi jättämään siihen jälkensä. Kaikki koodi katselmoidaan läpi ja mergetään projektiin kun näyttää hyvälle. Muutamasta mergetystä Pull Requestista oikeudet ylläpitää projektia.

[Issueita](https://github.com/koodiklinikka/koodiklinikka.fi/issues) voidaan käyttää myös sivun:

- toiminnallisuuteen
- designiin
- [HTTP-rajapintaan](https://github.com/koodiklinikka/koodiklinikka.fi-api)
- projektin hallintaan liittyviin asioihin
- tai koko Koodiklinikkaan yleisesti.

-----------------------------

## Projektin asennus

### Vaaditut työkalut

- Asenna [Node.js](http://nodejs.org)
- Asenna [Git](https://git-scm.com/) client lähdekoodin hallintaan

### Kloonaa projekti koneellesi

```sh
git clone https://github.com/koodiklinikka/koodiklinikka.fi.git
```

### Käynnistä kehitystila

```sh
cd koodiklinikka.fi
npm install
npm start
```

### Avaa esikatselu selaimessa

Avaa selaimessasi: [`http://localhost:3000`](http://localhost:3000)


## Komennot

### `npm install`

Asentaa projektin riippuvuudet

### `npm start`

Kääntää lähdetiedostot ja palvelee sovellusta porttiin `3000`

### `npm run build`

Kääntää lähdetiedostot -> `out/` -hakemistoon

