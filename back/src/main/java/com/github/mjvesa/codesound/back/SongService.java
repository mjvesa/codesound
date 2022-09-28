package com.github.mjvesa.codesound.back;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongService {

    @Autowired
    SongRepository songRepository;

    public List<Song> findAll() {
        var songs  = (List<Song>) songRepository.findAll();
        return songs;
    }
}
