FROM ubuntu:trusty
MAINTAINER "Niko Kurtti niko@salaliitto.com"
 
ENV NODE_VER v0.10.25
ENV PORT 8000

RUN apt-get update
RUN apt-get install -y git build-essential libssl-dev curl

RUN groupadd -r koodiklinikka && useradd --create-home -r -g koodiklinikka koodiklinikka

RUN mkdir /home/koodiklinikka/koodiklinikka.fi 

# Dirty hack to get Docker to cache packages
ADD package.json /home/koodiklinikka/koodiklinikka.fi/package.json
ADD bower.json /home/koodiklinikka/koodiklinikka.fi/bower.json

RUN chown -R koodiklinikka:koodiklinikka /home/koodiklinikka/koodiklinikka.fi

USER koodiklinikka

# Install nvm

RUN git clone https://github.com/creationix/nvm ~/.nvm 
RUN cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
RUN /bin/bash -c "source ~/.nvm/nvm.sh \
    && nvm install ${NODE_VER} \
    && nvm alias koodiklinikka.fi ${NODE_VER}"

WORKDIR /home/koodiklinikka/koodiklinikka.fi

# Install deps
RUN /bin/bash -c "source ~/.nvm/nvm.sh \
    && nvm use koodiklinikka.fi \
    && npm install"

ADD . /home/koodiklinikka/koodiklinikka.fi

USER root 
RUN chown -R koodiklinikka:koodiklinikka /home/koodiklinikka/koodiklinikka.fi


# Compile gulp
USER koodiklinikka

RUN /bin/bash -c "source ~/.nvm/nvm.sh \
    && nvm use koodiklinikka.fi \
    && NODE_ENV=production npm run build"

CMD NODE_ENV=$NODE_ENV PORT=$PORT /bin/bash -c "source ~/.nvm/nvm.sh \
                                                && nvm use koodiklinikka.fi \
                                                && node node_modules/http-server/bin/http-server"
EXPOSE $PORT
