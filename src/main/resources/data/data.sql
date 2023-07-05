DELETE FROM PLAYLIST_SONGS WHERE SONG_ID >= 10000 OR PLAYLIST_ID >= 10000;
DELETE FROM SONG WHERE ID >= 10000;
DELETE FROM PLAYLIST WHERE ID >= 10000;


INSERT INTO SONG VALUES (10000, 'Rick Astley', 150, 'Never gonna give you up');
INSERT INTO SONG VALUES (10003, 'Rick Astley', 150, 'Never gonna give you down');
INSERT INTO SONG VALUES (10004, 'Darude', 420, 'Sandstorm');
INSERT INTO SONG VALUES (10005, 'Bring Me The Horizon', 228, 'Can You Feel My Heart');
INSERT INTO SONG VALUES (10006, 'Alexander Alexandrov	', 999, 'Soviet Union Anthem');
INSERT INTO SONG VALUES (10007, 'NF', 435, 'HOPE');
INSERT INTO SONG VALUES (10008, 'NF', 124, 'PANDEMONIUM');
INSERT INTO SONG VALUES (10009, 'Elton John', 547, 'Im Still Standing');
INSERT INTO SONG VALUES (10010, 'The Mamas & The Papas', 15, 'California Dreaming');

INSERT INTO PLAYLIST VALUES (10000, 'Playlist 1');
INSERT INTO PLAYLIST VALUES (10003, 'Playlist 2');

INSERT INTO PLAYLIST_SONGS VALUES (10000, 10000);
INSERT INTO PLAYLIST_SONGS VALUES (10003, 10000);
INSERT INTO PLAYLIST_SONGS VALUES (10000, 10003);
-- INSERT INTO PLAYLIST_SONGS VALUES (10003, 10003);