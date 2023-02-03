package com.example.oauthloginexample.repository;

import com.example.oauthloginexample.entity.User;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class UserRepository {

    private static Long seq = 1L; // 직렬화 Serializalble
    private static Map<Long, User> table = new ConcurrentHashMap<>();

    public User save(User user) {
        if (user.getId() == null) {
            user.setId(seq);
            table.put(seq++, user);
        } else {
            table.replace(user.getId(), user);
        }

        return user;
    }

    public List<User> findAll() {
        Collection<User> values = table.values();
        return values.size() == 0 ? new ArrayList<>() : new ArrayList<>(values);
    }

    public Optional<User> findByEmail(String email) {
        for (User user : table.values()) {
            if (user.getEmail().equals(email)) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }
}
