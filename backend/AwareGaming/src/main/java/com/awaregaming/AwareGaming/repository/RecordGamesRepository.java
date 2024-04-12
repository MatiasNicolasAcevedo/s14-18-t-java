package com.awaregaming.AwareGaming.repository;

import com.awaregaming.AwareGaming.model.RecordGames;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;


@Repository
public interface RecordGamesRepository extends JpaRepository<RecordGames, Long> {


    //@Query("SELECT rg FROM RecordGames rg WHERE rg.userId = ?1")   //consulta JPQL que se ejecuta cuando se llama al metodo, se utiliza alias "rg" para representar a la entidad
    //List<RecordGames> findWeeklyActivitySummaryByUserId(Long userId);

}
