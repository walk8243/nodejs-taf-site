SELECT
	`result`,
    `competition`,
    `event`,
    `member`,
    SUBSTRING('XY1234Z', 'Y*([0-9]{1,3})')
    FROM `result`
    WHERE `del_flag`=0;
