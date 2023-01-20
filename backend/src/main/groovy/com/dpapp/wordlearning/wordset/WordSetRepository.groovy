package com.dpapp.wordlearning.wordset

import com.dpapp.wordlearning.users.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface WordSetRepository extends JpaRepository<WordSet, Long> {

    boolean existsByUserAndName(User user, String name)

    List<WordSetProjection> findAllByUser(User user)

    @Query("""
        SELECT ws FROM WordSet ws
            WHERE ws.user = :user
            AND (ws.originalLanguage = :ol OR :ol IS NULL)
            AND (ws.foreignLanguage = :fl OR :fl IS NULL)
    """)
    List<WordSetProjection> findAll(@Param("user") User user, @Param("ol") String ol, @Param("fl") String fl)

    @Query(

            value = """
                SELECT DISTINCT on (original_language, foreign_language) * FROM word_set WHERE user_id = :userId
            """,
            nativeQuery = true
    )
    List<WordSet> findAllLanguages(@Param("userId") userId)
}