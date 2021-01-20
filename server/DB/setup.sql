create table pizza (
    pid         INTEGER primary key,
    size        TEXT not null unique,
    price       INTEGER not null, 
    numbers     INTEGER not null,
    maxnum      INTEGER not null,
    available   INTEGER not null
);

create table user (
    uid         INTEGER primary key,
    password    TEXT not null,
    type        INTEGER default 0 not null,
    email       TEXT not null unique
);

create table orders (
    oid         INTEGER primary key,
    ref_user    INTEGER not null references user,
    timestam    INTEGER,
    states      INTEGER default 0 not null,
    sum         FLOAT not null
);

create table bookings (
    bid         INTEGER primary key,
    ref_order   INTEGER not null references orders,
    ref_pizza   INTEGER not null references pizza,
    olives      INTEGER default 0 not null,
    ham         INTEGER default 0 not null,
    bacon       INTEGER default 0 not null,
    mushrooms   INTEGER default 0 not null,
    eggs        INTEGER default 0 not null,
    artichokes  INTEGER default 0 not null,
    seafood     INTEGER default 0 not null,
    chips       INTEGER default 0 not null,
    vegetables  INTEGER default 0 not null,
    tomato      INTEGER default 0 not null,
    availnum    INTEGER default 0 not null,
    numpizza    INTEGER default 1 not null,
    cost        FLOAT not null
)

