<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:template match="/">
		<html>
			<head>
			</head>
			<body>
				<table class="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white customer-table">
					<tr>
						<th>gameTitle</th>
						<th>gamePrice</th>
						<th>gameGenre</th>
						<th>consoleType</th>
						<th>releaseDate</th>
						<th>numAvail</th>
						<th>gameImg</th>
						<th>gameDescr</th>
					</tr>
					<xsl:for-each select="Games/Game">
							<tr>
								<td>
									<xsl:value-of select="gameTitle"/>
								</td>
								<td>
									<xsl:value-of select="gamePrice"/>
								</td>
								<td>
									<xsl:value-of select="gameGenre"/>
								</td>
								<td>
									<xsl:value-of select="consoleType"/>
								</td>
								<td>
									<xsl:value-of select="releaseDate"/>
								</td>
								<td>
									<xsl:value-of select="numAvail"/>
								</td>
								<td>
									<xsl:value-of select="gameImg"/>
								</td>
								<td>
									<xsl:value-of select="gameDescr"/>
								</td>
							</tr>
					</xsl:for-each>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>