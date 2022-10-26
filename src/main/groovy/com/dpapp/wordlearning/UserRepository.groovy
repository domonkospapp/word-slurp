package com.dpapp.wordlearning

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsernameAndEmail(String username, String email);

    Optional<User> getByUsernameAndEmail(String username, String email);
}